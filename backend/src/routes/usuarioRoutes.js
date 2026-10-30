const express = require("express");
const controller = require("../controller/usuarioController");
const { verificarToken, requiereRol } = require("../middleware/verificarToken");
const router = express.Router();

router.get("/", verificarToken, requiereRol("administrador"), controller.listar);
router.put("/:id", verificarToken, requiereRol("administrador"), controller.actualizar);
router.delete("/:id", verificarToken, requiereRol("administrador"), controller.eliminar);

module.exports = router;
