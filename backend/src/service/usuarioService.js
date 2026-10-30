const { AppDataSource } = require("../config/data-source");
const UsuarioEntity = require("../entities/usuario");

const ROLES_VALIDOS = ["administrador", "coordinador", "docente", "estudiante"];
const ESTADOS_VALIDOS = ["activo", "inactivo"];

function mapearUsuario(usuario) {
    return {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        estado: usuario.estado
    };
}

async function obtenerTodos() {
    const repo = AppDataSource.getRepository(UsuarioEntity);
    const usuarios = await repo.find({ order: { id_usuario: "ASC" } });
    return usuarios.map(mapearUsuario);
}

async function eliminar(id) {
    const repo = AppDataSource.getRepository(UsuarioEntity);
    const resultado = await repo.delete({ id_usuario: id });

    if (resultado.affected === 0) {
        throw new Error("Usuario no encontrado");
    }
}

async function actualizarRolEstado(id, datos) {
    const repo = AppDataSource.getRepository(UsuarioEntity);
    const usuario = await repo.findOneBy({ id_usuario: id });

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    if (datos.rol !== undefined) {
        if (!ROLES_VALIDOS.includes(datos.rol)) {
            throw new Error("Rol inválido");
        }
        usuario.rol = datos.rol;
    }

    if (datos.estado !== undefined) {
        if (!ESTADOS_VALIDOS.includes(datos.estado)) {
            throw new Error("Estado inválido");
        }
        usuario.estado = datos.estado;
    }

    const actualizado = await repo.save(usuario);
    return mapearUsuario(actualizado);
}

module.exports = { obtenerTodos, eliminar, actualizarRolEstado };
