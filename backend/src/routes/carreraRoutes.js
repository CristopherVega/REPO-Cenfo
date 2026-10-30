const express= require("express");
const controller=require("../controller/carreraController");
const { verificarToken, requiereRol } = require("../middleware/verificarToken");
const router=express.Router();

router.get("/", controller.listar);
router.post("/", verificarToken, requiereRol("administrador", "coordinador"), controller.crear);
router.delete("/:id", verificarToken, requiereRol("administrador", "coordinador"), controller.eliminar);

module.exports=router;
