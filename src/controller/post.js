const models = require("../models");
const tabelaPost = models.Post;
const tabelaArquivos = models.Arquivos;
const tabelaAutor = models.Autor;

exports.criar = async (req, res) => {
  const receiveAutorId = req.body.autorId;
  const validAutorId = await tabelaAutor.findByPk(receiveAutorId);
  if (validAutorId) {
    const post = await tabelaPost.create(req.body);
    const receiveIdPost = post.id;
    const receiveOriginalName = req.file.originalname;
    const receiveMimeType = req.file.mimetype;
    const receiveFileName = req.file.filename;
    const receiveSize = req.file.size;
    console.log(req.file);
    await tabelaArquivos.create({
      postId: receiveIdPost,
      originalname: receiveOriginalName,
      mimetype: receiveMimeType,
      filename: receiveFileName,
      size: receiveSize,
    });
    return res.json(post);
  }
  return res.json("Please, write a valid autorId");
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
