const models = require("../models");
const tabelaPost = models.Post;

exports.criar = async (req, res) => {
  const post = await tabelaPost.create(req.body);
  return res.json(post);
};

exports.alterar = async (req, res) => {
  const recebeId = req.params.id;
  const { titulo, conteudo } = req.body;
  await tabelaPost.uptate({ titulo, conteudo }, { where: { id: recebeId } });
  const posts = await tabelaPost.findByPk(recebeId);
  res.json(posts);
};

exports.deletar = async (req, res) => {
  const recebeId = req.params.id;
  await tabelaPost.destroy({ where: { id: recebeId } });
  res.json({ message: "Post " + recebeId + " deletado com sucesso" });
};

exports.listar = async (req, res) => {
  const post = await tabelaPost.findAll();
  return res.json(post);
};
