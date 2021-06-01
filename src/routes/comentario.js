const express = require("express")

const router = express.Router()

const conttrolerComentario = require("../controller/comentario");

// //********Comentario***********
router.post("/comentario",conttrolerComentario.criar);
router.put("/comentario/:id", conttrolerComentario.alterar);
router.put("/comentario/", conttrolerComentario.alterarErr);
router.delete("/comentario/:id", conttrolerComentario.deletar);
router.delete("/comentario/", conttrolerComentario.deletarErr);
router.get("/comentario", conttrolerComentario.listar);

module.exports = router