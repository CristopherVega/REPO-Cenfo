const service = require("../service/usuarioService");

async function listar(req, res) {
    try {
        const datos = await service.obtenerTodos();
        res.status(200).json(datos);
    } catch (error) {
        res.status(500).json({ mensaje: "Ocurrio un error en el servidor" });
    }
}

async function eliminar(req, res) {
    try {
        const id = Number(req.params.id);
        await service.eliminar(id);
        res.status(200).json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
}

async function actualizar(req, res) {
    try {
        const id = Number(req.params.id);
        const actualizado = await service.actualizarRolEstado(id, req.body);
        res.status(200).json(actualizado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
}

module.exports = { listar, eliminar, actualizar };