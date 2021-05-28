const models = require("../models");
const tabelaPost = models.Post;
const tabelaArquivos = models.Arquivos;
const tabelaAutor = models.Autor;

exports.criar = async (req, res) => {
  const receiveAutorId = req.body.autorId;
  const validAutorId = await tabelaAutor.findByPk(receiveAutorId);

  if (!validAutorId) return res.json({ mesasge: "Author not found" });

  const post = await tabelaPost.create(req.body);
  const receiveIdPost = post.id;

  if (req.file) {
    await tabelaArquivos.create({
      postId: receiveIdPost,
      ...req.file,
    });
  }
  return res.json(post);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.alterar = async (req, res) => {
  const recebeId = req.params.id;
  const { titulo, conteudo } = req.body;
  await tabelaPost.uptate({ titulo, conteudo }, { where: { id: recebeId } });
  const posts = await tabelaPost.findByPk(recebeId);
  res.json(posts);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.deletar = async (req, res) => {
  const recebeId = req.params.id;
  await tabelaPost.destroy({ where: { id: recebeId } });
  res.json({ message: "Post " + recebeId + " deletado com sucesso" });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.listar = async (req, res) => {
  const post = await tabelaPost.findAll({
    include: {
      model: tabelaArquivos,
      as: "arquivos",
    },
  });
  return res.json(post);
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.alterarErr = async (req, res) => {
  return res.json("Please, enter an id");
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.deletarErr = async (req, res) => {
  return res.json("Please, enter an id");
};
