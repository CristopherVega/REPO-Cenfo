import { usuarioRepository } from "../repositories/usuarioRepository";

export const usuarioService = {
    obtenerTodos: function () {
        return usuarioRepository.obtenerTodos();
    },
    actualizar: function (usuarioID, datos) {
        return usuarioRepository.actualizar(usuarioID, datos);
    },
    eliminar: function (usuarioID) {
        return usuarioRepository.eliminar(usuarioID);
    }
};