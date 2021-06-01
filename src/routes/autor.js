const express = require("express");

const router = express.Router();

const conttrolerAutor = require("../controller/autor");

//********Autor***********
router.post("/autor/login",conttrolerAutor.login);
router.post("/autor",conttrolerAutor.criar);
router.put("/autor/:id", conttrolerAutor.alterar);
router.delete("/autor/:id", conttrolerAutor.deletar);
router.put("/autor/", conttrolerAutor.alterarErr);
router.delete("/autor/", conttrolerAutor.deletarErr);
router.get("/autor", conttrolerAutor.listar);
router.get("/autor/:id", conttrolerAutor.listarUm);

module.exports = router