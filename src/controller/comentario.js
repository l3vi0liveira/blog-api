const models = require("../models");
const tabelaComentario = models.Comentario;

exports.criar = async (req, res) => {
  const comentario = await tabelaComentario.create(req.body);
  return res.json(comentario);
};

exports.alterar = async (req, res) => {
  const recebeId = req.params.id;
  const { texto } = req.body;
  await tabelaComentario.uptate({ texto }, { where: { id: recebeId } });
  const comentarios = await tabelaComentario.findByPk(recebeId);
  res.json(comentarios);
};

exports.deletar = async (req, res) => {
  const recebeId = req.params.id;
  await tabelaComentario.destroy({ where: { id: recebeId } });
  res.json({ message: "Comentario " + recebeId + " deletado com sucesso" });
};

exports.listar = async (req, res) => {
  const comentario = await tabelaComentario.findAll();
  return res.json(comentario);
};
