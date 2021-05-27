const models = require("../models");
const tabelaAutor = models.Autor;
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const salt = "r37y65tgh098juy676";

exports.login = async (req, res) => {
  const receiveEmail = req.body.email;
  const receiveSenha = req.body.senha;
  if(!receiveEmail && !receiveSenha){return res.json("Please enter email and / or password")}
  const getEmail = await tabelaAutor.findOne({
    where:{
      email: receiveEmail
    }
  })
  const getSenha = getEmail.senha;
  console.log(getSenha)
  console.log(receiveSenha)
  
  if(getEmail!=0){ return res.json("Login successfully")}
  return res.json("Incorrect login and / or password")
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
  if (verifyEmail!=0) {
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
  const recebeId = req.params.id;
  const { nome, email, senha } = req.body;
  await tabelaAutor.uptate({ nome, email, senha }, { where: { id: recebeId } });
  const autores = await tabelaAutor.findByPk(recebeId);
  res.json(autores);
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
