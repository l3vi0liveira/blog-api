const express = require("express");
const multer = require("multer");
const multerMiddleware = require("../middleware/multer")

const conttrolerPost = require("../controller/post");
const conttrolerComentario = require("../controller/comentario");
const conttrolerMarcador = require("../controller/marcador");
const middlewareVerify = require("../middleware/token");

const authorRoutes = require('./author')

const router = express.Router();

router.use(authorRoutes)

// //********Post***********
router.post("/post",middlewareVerify.verifyToken,multer(multerMiddleware).single('file'),conttrolerPost.criar);
router.put("/post/:id",middlewareVerify.verifyToken, conttrolerPost.alterar);
router.put("/post/",middlewareVerify.verifyToken, conttrolerPost.alterarErr);
router.delete("/post/:id",middlewareVerify.verifyToken, conttrolerPost.deletar);
router.delete("/post/",middlewareVerify.verifyToken, conttrolerPost.deletarErr);
router.get("/post",middlewareVerify.verifyToken, conttrolerPost.listar);

// //********Comentario***********
router.post("/comentario",conttrolerComentario.criar);
router.put("/comentario/:id", conttrolerComentario.alterar);
router.put("/comentario/", conttrolerComentario.alterarErr);
router.delete("/comentario/:id", conttrolerComentario.deletar);
router.delete("/comentario/", conttrolerComentario.deletarErr);
router.get("/comentario", conttrolerComentario.listar);

// //********Marcador***********
router.post("/marcador",conttrolerMarcador.criar);
router.put("/marcador/:id", conttrolerMarcador.alterar);
router.put("/marcador/", conttrolerMarcador.alterarErr);
router.delete("/marcador/:id", conttrolerMarcador.deletar);
router.delete("/marcador/", conttrolerMarcador.deletarErr);
router.get("/marcador", conttrolerMarcador.listar);

module.exports = router;