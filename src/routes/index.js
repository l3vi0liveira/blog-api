const express = require("express");

const controllerUsuario = require("../controller/usuario");
const controllerProduto = require("../controller/produto");
const controllerEndereco = require("../controller/endereco")
const controllerPedido = require("../controller/pedido")
const controllerFornecedor = require("../controller/fornecedor")

const router = express.Router();

/*****USUARIO*****/
router.get("/usuario", controllerUsuario.listar);
router.post("/usuario",controllerUsuario.validaUsuario, controllerUsuario.criar);
router.delete("/usuario/:id",controllerUsuario.deletar);
router.delete("/usuario/",controllerUsuario.deletarErro);
router.put("/usuario/:id",controllerUsuario.alterar);
router.put("/usuario/",controllerUsuario.alterarErro);

/*****PRODUTO****/
router.post("/produto", controllerProduto.criar);
router.get("/produto", controllerProduto.listar);
router.delete("/produto/:id",controllerProduto.deletar);
router.put("/produto/:id",controllerProduto.alterar);

/*****ENDEREÇO****/
router.post("/endereco", controllerEndereco.criar);
router.get("/endereco", controllerEndereco.listar);
router.delete("/endereco/:id",controllerEndereco.deletar);
router.put("/endereco/:id",controllerEndereco.alterar);

/*****PEDIDO****/
router.post("/pedido",  controllerPedido.criar);
router.get("/pedido", controllerPedido.listar);
router.delete("/pedido/:id",controllerPedido.deletar);
router.put("/pedido/:id",controllerPedido.alterar);

/*****FORNECEDOR****/
router.post("/fornecedor", controllerFornecedor.criar);
router.get("/fornecedor", controllerFornecedor.listar);
router.delete("/fornecedor/:id",controllerFornecedor.deletar);
router.put("/fornecedor/:id",controllerFornecedor.alterar);

module.exports = router;
