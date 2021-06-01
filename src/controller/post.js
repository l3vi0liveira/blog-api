const models = require("../models");
const tabelaPost = models.Post;
const tabelaArquivos = models.Arquivos;
const tabelaAutor = models.Autor;
const { Op } = require("sequelize");
const sequelize = require("sequelize");


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
  await tabelaPost.update({ titulo, conteudo }, { where: { id: recebeId } });
  const posts = await tabelaPost.findByPk(recebeId);
  res.json(posts);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.deletar = async (req, res) => {
  const postId = req.params.id;
  await tabelaArquivos.destroy({ where: { postId } });
  const find = await tabelaPost.destroy({ where: { id: postId } });
  if (find) {
    res.json({ message: "Post deleted successfully" });
  }
  return res.json({ message: "Post not found" });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.listar = async (req, res) => {
  const post = await tabelaPost.findAll({
    include: {
      model: tabelaArquivos,
      as: "arquivos",
    },
  });
  if (post != 0) {
    return res.json(post);
  }
  return res.json({ message: "Post not found" });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.alterarErr = async (req, res) => {
  return res.json({ message: "Please, enter an id" });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.deletarErr = async (req, res) => {
  return res.json({ message: "Please, enter an id" });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.orderBy = async (req, res) => {
  const orderby = await tabelaPost.findAll({
    order: [["createdAt", "ASC"]],
    include: {
      model: tabelaArquivos,
      as: "arquivos",
    },
  });
  if (orderby) {
    res.json({ message: orderby });
  }
  return res.json({ message: "Post not found" });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.title = async (req, res) => {
  const title = req.query.pesquisar;

  const pesquisa = `%${title}%`

  const orderTitle = await tabelaPost.findAll({
    where: {
      titulo: {
        [Op.like]: pesquisa,
      },
    },
  });

   return res.json(orderTitle);
  
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.range = async (req, res) => {
  const {first, secound} = req.body;
  const range = await tabelaPost.findAll({
    where: {
      createdAt: {
        [Op.between]: [first,secound],
      },
    },
  });

  if (range != 0) {
    res.json({ range });
  }
  return res.json({ message: "Date not found" });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.starting = async (req, res) => {
  const starting = req.body.starting;
  const orderDate = await tabelaPost.findAll({
    where: {
      createdAt: {
        [Op.gt]: starting,
      },
    },
  });

  if (orderDate != 0) {
    res.json({ orderDate });
  }
  return res.json({ message: "Date not found" });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.titlenotnull = async (req, res) => {
  const titlenotnull = await tabelaPost.findAll({
    where: {
      titulo: {
        [Op.ne]: "",
      },
    },
  });

  if (titlenotnull != 0) {
    res.json({ titlenotnull });
  }
  return res.json({ message: "Title not found" });
};
