const express = require("express")

const router = express.Router()

const conttrolerMarcador = require("../controller/marcador");
 
// //********Marcador***********
router.post("/marcador",conttrolerMarcador.criar);
router.put("/marcador/:id", conttrolerMarcador.alterar);
router.put("/marcador/", conttrolerMarcador.alterarErr);
router.delete("/marcador/:id", conttrolerMarcador.deletar);
router.delete("/marcador/", conttrolerMarcador.deletarErr);
router.get("/marcador", conttrolerMarcador.listar);

module.exports = router