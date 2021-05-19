const models = require("../models");
const tabelaAutor = models.Autor;

exports.criar = async (req, res) => {
  const autor = await tabelaAutor.create(req.body);
  return res.json(autor);
};

exports.alterar = async (req, res) => {
  const recebeId = req.params.id;
  const { nome, email, senha } = req.body;
  await tabelaAutor.uptate({ nome, email, senha }, { where: { id: recebeId } });
  const autores = await tabelaAutor.findByPk(recebeId);
  res.json(autores);
};

exports.deletar = async (req, res) => {
  const recebeId = req.params.id;
  await tabelaAutor.destroy({ where: { id: recebeId } });
  res.json({ message: "Autor " + recebeId + " deletado com sucesso" });
};

exports.listar = async (req, res) => {
  const autor = await tabelaAutor.findAll();
  return res.json(autor);
};
