const express = require("express");
const multer = require("multer");
const multerMiddleware = require("../middleware/multer")
const conttrolerAutor = require("../controller/autor");
const conttrolerPost = require("../controller/post");
const conttrolerComentario = require("../controller/comentario");
const conttrolerMarcador = require("../controller/marcador");

const router = express.Router();

//********Autor***********
router.post("/autor",conttrolerAutor.criar);
router.put("/autor/:id", conttrolerAutor.alterar);
router.delete("/autor/:id", conttrolerAutor.deletar);
router.get("/autor", conttrolerAutor.listar);

// //********Post***********
router.post("/post",multer(multerMiddleware).single('file'),conttrolerPost.criar);
router.put("/post/:id", conttrolerPost.alterar);
router.delete("/post/:id", conttrolerPost.deletar);
router.get("/post", conttrolerPost.listar);

// //********Comentario***********
router.post("/comentario",conttrolerComentario.criar);
router.put("/comentario/:id", conttrolerComentario.alterar);
router.delete("/comentario/:id", conttrolerComentario.deletar);
router.get("/comentario", conttrolerComentario.listar);

// //********Marcador***********
router.post("/marcador",conttrolerMarcador.criar);
router.put("/marcador/:id", conttrolerMarcador.alterar);
router.delete("/marcador/:id", conttrolerMarcador.deletar);
router.get("/marcador", conttrolerMarcador.listar);

module.exports = router;