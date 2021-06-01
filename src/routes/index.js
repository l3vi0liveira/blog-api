const express = require("express");

const autorRoutes = require('./autor')
const postRoutes = require('./post')
const comentarioRoutes = require('./comentario')
const marcadorRoutes = require('./marcador')

const router = express.Router();

router.use(autorRoutes)
router.use(postRoutes)
router.use(comentarioRoutes)
router.use(marcadorRoutes)

module.exports = router;