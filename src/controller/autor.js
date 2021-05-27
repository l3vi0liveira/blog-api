const models = require("../middleware/models");
const tabelaAutor = models.Autor;
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const salt = "r37y65tgh098juy676";
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const receiveEmail = req.body.email;
  const receiveSenha = req.body.senha;
  if (!receiveEmail && !receiveSenha) {
    return res.json("Please enter email and / or password");
  }
  const getEmail = await tabelaAutor.findOne({
    where: {
      email: receiveEmail,
    },
  });

  if (getEmail != 0 && getEmail != null) {
    const getSenha = getEmail.senha;
    const hash = crypto.createHmac("sha512", salt);
    hash.update(receiveSenha);
    const receivePassword = hash.digest("hex");
    const validLogin = Boolean(getEmail);
    if (getSenha == receivePassword) {
       token = jwt.sign({ validLogin }, "Bearer " +process.env.TESTE_ENV, {expiresIn: 2});
       console.log(token)
      return res.json(
        "Login successfully, your token was generated :" + token+" and it expires in 1 minute");
    }
  }
  return res.json("Incorrect login and / or password");
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.criar = async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  const nome = req.body.nome;
  const hash = crypto.createHmac("sha512", salt);
  hash.update(senha);
  const value = hash.digest("hex");
  const verifyEmail = await tabelaAutor.findAll({
    where: {
      email: email,
    },
  });
  if (verifyEmail != 0) {
    return res.json({ message: "E-mail already registered" });
  } else {
    const autor = await tabelaAutor.create({
      nome: nome,
      senha: value,
      email: email,
    });
    return res.json(autor);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.alterar = async (req, res) => {
  const receiveId = req.params.id;
  const { nome, email, senha } = req.body;
  console.log(receiveId);
  const receiveAltera = await tabelaAutor.findByPk(receiveId);
  console.log(receiveAltera);
  if (receiveAltera) {
    const hash = crypto.createHmac("sha512", salt);
    hash.update(senha);
    const value = hash.digest("hex");
    console.log(value);
    await tabelaAutor.update(
      { nome, email, senha: value },
      { where: { id: receiveId } }
    );
    res.json(receiveAltera);
  }
  res.json("Please, use a valid id ");
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.deletar = async (req, res) => {
  const recebeId = req.params.id;
  await tabelaAutor.destroy({ where: { id: recebeId } });
  res.json({ message: "Autor " + recebeId + " deletado com sucesso" });
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.alterarErr = async (req, res) => {
  return res.json("Please, enter an id");
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.deletarErr = async (req, res) => {
  return res.json("Please, enter an id");
};
