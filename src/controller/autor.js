const models = require("../models");
const tabelaAutor = models.Autor;
const crypto = require("crypto");
const salt = "r37y65tgh098juy676";

exports.login = async (req, res) => {
  const receiveEmail = req.body.email;
  const receiveSenha = req.body.senha;
  if (!receiveSenha && !receiveEmail) {
    res.json({ message: "Please, enter the required fields" });
  }
  const amoutAutor = await tabelaAutor.count({
    where: {
      email: receiveEmail,
      senha: receiveSenha,
    },
    attributes: { exclude: ["senha"] },
  });
  if (amoutAutor) {
    return res.json({ message: "Login successfully" });
  }
  return res.json({ message: "Username or password is invalid" });
};
exports.criar = async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  const nome = req.body.nome;
  const hash = crypto.createHmac("sha512", salt);
  hash.update(senha);
  const value = hash.digest("hex");
  const autor = await tabelaAutor.create({
    nome:nome, senha:value, email:email
  });
  return res.json(autor);
};

exports.alterar = async (req, res) => {
  const recebeId = req.params.id;
  const { nome, email, senha } = req.body;
  await tabelaAutor.uptate({ nome, email, senha }, { where: { id: recebeId } });
  const autores = await tabelaAutor.findByPk(recebeId);
  res.json(autores);
};

exports.deletar = async (req, res) => {
  const recebeId = req.params.id;
  await tabelaAutor.destroy({ where: { id: recebeId } });
  res.json({ message: "Autor " + recebeId + " deletado com sucesso" });
};

exports.listar = async (req, res) => {
  const autor = await tabelaAutor.findAll({
    attributes: {
      exclude: "senha",
    },
  });
  return res.json(autor);
};
