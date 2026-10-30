const express = require("express");
const controller = require("../controller/ProduccionController");
const upload = require("../middleware/upload");
const { verificarToken, requiereRol, requierePropietarioProduccion } = require("../middleware/verificarToken");
const router = express.Router();

router.get("/", controller.listar);

router.post("/", verificarToken, upload.single("contenido"), controller.crear);
router.put("/:id", verificarToken, requierePropietarioProduccion, upload.single("contenido"), controller.actualizar);
router.delete("/:id", verificarToken, requiereRol("administrador", "coordinador"), controller.eliminar);

module.exports = router;
