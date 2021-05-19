const models = require("../models");
const tabelaMarcador = models.Marcador;

exports.criar = async (req, res) => {
  const marcador = await tabelaMarcador.create(req.body);
  return res.json(marcador);
};

exports.alterar = async (req, res) => {
  const recebeId = req.params.id;
  const { nome } = req.body;
  await tabelaMarcador.uptate({ nome }, { where: { id: recebeId } });
  const marcadores = await tabelaMarcador.findByPk(recebeId);
  res.json(marcadores);
};

exports.deletar = async (req, res) => {
  const recebeId = req.params.id;
  await tabelaMarcador.destroy({ where: { id: recebeId } });
  res.json({ message: "Marcador " + recebeId + " deletado com sucesso" });
};

exports.listar = async (req, res) => {
  const marcador = await tabelaMarcador.findAll();
  return res.json(marcador);
};
