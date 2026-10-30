const service = require("../service/ProduccionService");
const fs = require("fs");
const path = require("path");

async function listar(req, res) {
    try {
        const datos = await service.obtenerTodos();
        res.status(200).json(datos);
    } catch (error) {
        console.error("ERROR REAL EN /api/producciones:", error);
        res.status(500).json({ mensaje: "Ocurrio un error en el servidor" });
    }
}

async function crear(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ mensaje: "El archivo PDF es obligatorio" });
        }

        const datos = {
            ...req.body,
            id_autor: req.usuario.id,
            contenido: req.file.filename
        };

        const nuevo = await service.crear(datos);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error("ERROR REAL EN POST /api/producciones:", error);
        if (req.file) {
            fs.unlink(req.file.path, function () {});
        }
        res.status(400).json({ mensaje: error.message });
    }
}

async function actualizar(req, res) {
    try {
        const id = Number(req.params.id);
        const datos = { ...req.body };

        if (req.file) {
            datos.contenido = req.file.filename;
        }

        const actualizado = await service.actualizar(id, datos);
        res.status(200).json(actualizado);
    } catch (error) {
        console.error("ERROR REAL EN PUT /api/producciones/:id:", error);
        if (req.file) {
            fs.unlink(req.file.path, function () {});
        }
        res.status(400).json({ mensaje: error.message });
    }
}

async function eliminar(req, res) {
    try {
        const id = Number(req.params.id);
        const eliminado = await service.eliminar(id);

        if (eliminado && eliminado.contenido) {
            const rutaArchivo = path.join(__dirname, "../../upload", eliminado.contenido);
            fs.unlink(rutaArchivo, function () {});
        }

        res.status(200).json({ mensaje: "Producción eliminada" });
    } catch (error) {
        console.error("ERROR REAL EN DELETE /api/producciones/:id:", error);
        res.status(404).json({ mensaje: error.message });
    }
}

module.exports = { listar, crear, actualizar, eliminar };
