const express = require("express")

const multer = require("multer");

const multerMiddleware = require("../middleware/multer")

const middlewareVerify = require("../middleware/token");

const router = express.Router()

const conttrolerPost = require("../controller/post");

// //********Post***********
router.post("/post",middlewareVerify.verifyToken,multer(multerMiddleware).single('file'),conttrolerPost.criar);
router.put("/post/:id",middlewareVerify.verifyToken, conttrolerPost.alterar);
router.put("/post/",middlewareVerify.verifyToken, conttrolerPost.alterarErr);
router.delete("/post/:id",middlewareVerify.verifyToken, conttrolerPost.deletar);
router.delete("/post/",middlewareVerify.verifyToken, conttrolerPost.deletarErr);
router.get("/post",middlewareVerify.verifyToken, conttrolerPost.listar);
router.get("/post/orderby",middlewareVerify.verifyToken,conttrolerPost.orderBy)
router.get("/post/title",middlewareVerify.verifyToken,conttrolerPost.title)
router.post("/post/range",middlewareVerify.verifyToken,conttrolerPost.range)
router.post("/post/starting",middlewareVerify.verifyToken,conttrolerPost.starting)
router.get("/post/titlenotnull",middlewareVerify.verifyToken,conttrolerPost.titlenotnull)

module.exports = router