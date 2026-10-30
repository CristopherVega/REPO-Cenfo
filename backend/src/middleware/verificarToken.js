const jwt = require("jsonwebtoken");
const { AppDataSource } = require("../config/data-source");
const ProduccionEntity = require("../entities/produccionAcademica");

const JWT_SECRET = process.env.JWT_SECRET;


function verificarToken(req, res, next) {
    const encabezado = req.headers.authorization;

    if (!encabezado || !encabezado.startsWith("Bearer ")) {
        return res.status(401).json({ mensaje: "No autorizado: falta el token" });
    }

    const token = encabezado.split(" ")[1];

    try {
        const decodificado = jwt.verify(token, JWT_SECRET);
        req.usuario = decodificado; // { id, nombre, rol }
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: "Token inválido o expirado" });
    }
}

function requiereRol(...rolesPermitidos) {
    return function (req, res, next) {
        if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ mensaje: "No tienes permisos para esta acción" });
        }
        next();
    };
}

async function requierePropietarioProduccion(req, res, next) {
    if (["administrador", "coordinador"].includes(req.usuario.rol)) {
        return next();
    }

    try {
        const produccion = await AppDataSource.getRepository(ProduccionEntity).findOne({
            where: { id_produccion: Number(req.params.id) },
            relations: { autor: true }
        });

        if (!produccion) {
            return res.status(404).json({ mensaje: "Producción no encontrada" });
        }
        if (produccion.autor.id_usuario !== req.usuario.id) {
            return res.status(403).json({ mensaje: "No tienes permiso para editar esta producción" });
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { verificarToken, requiereRol, requierePropietarioProduccion };
