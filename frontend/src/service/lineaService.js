import { lineaRepository } from "../repositories/lineaRepository";

function validarRegistro(investigacion) {
    if (!investigacion.nombre || investigacion.nombre.trim() === "") {
        throw new Error("El nombre de la línea de investigación es obligatorio");
    }
}

export const lineaService = {
    obtenerTodos: function () {
        return lineaRepository.obtenerTodos();
    },
    crear: function (investigacion) {
        validarRegistro(investigacion);
        return lineaRepository.crear(investigacion);
    },
    eliminar: function (investigacionID) {
        return lineaRepository.eliminar(investigacionID);
    }
};