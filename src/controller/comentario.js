const models = require("../models");
const tabelaComentario = models.Comentario;
const tabelaPost = models.Post;

exports.criar = async (req, res) => {
  const receivePostId = req.body.postId;
  console.log(receivePostId);
  const seachPost = await tabelaPost.findByPk(receivePostId);
  console.log(seachPost);
  if (seachPost) {
    const comentario = await tabelaComentario.create(req.body);
    return res.json(comentario);
  }
  return res.json("Please, write a valid postId");
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.alterar = async (req, res) => {
  const recebeId = req.params.id;
  const { texto } = req.body;
  await tabelaComentario.update({ texto }, { where: { id: recebeId } });
  const comentarios = await tabelaComentario.findByPk(recebeId);
  res.json(comentarios);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.deletar = async (req, res) => {
  const recebeId = req.params.id;
  await tabelaComentario.destroy({ where: { id: recebeId } });
  res.json({ message: "Comentario " + recebeId + " deletado com sucesso" });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.listar = async (req, res) => {
  const comentario = await tabelaComentario.findAll();
  return res.json(comentario);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.alterarErr = async (req, res) => {
  return res.json("Please, enter an id");
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.deletarErr = async (req, res) => {
  return res.json("Please, enter an id");
};
