const models = require("../models");
const crypto = require("crypto");

const { createHash, compare } = require("../utils/crypto");

const tabelaAutor = models.Autor;

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email && !senha) {
    return res.json("Please enter email and / or password");
  }

  const autor = await tabelaAutor.findOne({
    where: {
      email,
    },
  });

  if (!autor || !compare(autor.senha, req.body.senha)) {
    return res.json({ message: "user not found" });
  }

  token = jwt.sign({ id: autor.id }, process.env.SECRET, { expiresIn: 3000 });

  return res.json({ message: "Successfully logged:", token });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.criar = async (req, res) => {
  const verifyEmail = await tabelaAutor.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (verifyEmail) {
    return res.json({ message: "E-mail already registered" });
  }

  const senhaComHash = createHash(req.body.senha);

  const autor = await tabelaAutor.create({
    ...req.body,
    senha: senhaComHash,
  });

  return res.json(autor);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.alterar = async (req, res) => {
  const receiveId = req.params.id;
  const { senha } = req.body;

  const receiveAltera = await tabelaAutor.findByPk(receiveId);

  if (receiveAltera) {
    if (senha) {
      const hash = crypto.createHmac("sha512", salt);
      hash.update(senha);
      const value = hash.digest("hex");

      req.body.senha = value;
    }

    await tabelaAutor.update(req.body, { where: { id: receiveId } });
    res.json(receiveAltera);
  }
  res.json({message:"Please, use a valid id "});
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.deletar = async (req, res) => {
  const receiveId = req.params.id;

  const receiveAltera = await tabelaAutor.findByPk(receiveId);
  if (receiveAltera) {
    await tabelaAutor.destroy({ where: { id: receiveId } });
    res.json({ message: "Author successfully deleted" });
  }
  res.json({message:"Please, use a valid id "});
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.listar = async (req, res) => {
  const autor = await tabelaAutor.findAll({
    attributes: {
      exclude: "senha",
    },
  });
  return res.json(autor);
};

exports.listarUm = async (req, res) => {
  const autor = await tabelaAutor.findByPk(req.params.id);
  return res.json(autor);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.alterarErr = async (req, res) => {
  return res.json("Please, enter an id");
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.deletarErr = async (req, res) => {
  return res.json("Please, enter an id");
};
