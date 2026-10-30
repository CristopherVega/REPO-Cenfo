const express = require("express");
const controller = require("../controller/reportesController");
const { verificarToken, requiereRol } = require("../middleware/verificarToken");

const router = express.Router();
router.get("/", verificarToken, requiereRol("administrador", "coordinador", "docente"), controller.obtenerIndicadores);

module.exports = router;
