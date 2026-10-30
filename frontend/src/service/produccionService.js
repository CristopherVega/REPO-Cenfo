import { produccionRepository } from "../repositories/produccionRepository";

function validar(produccion, esCreacion) {
    if (!produccion.titulo || produccion.titulo.trim() === "") {
        throw new Error("El título es obligatorio");
    }
    if (!produccion.anio) {
        throw new Error("El año es obligatorio");
    }
    if (esCreacion && !produccion.archivo) {
        throw new Error("Debes adjuntar el PDF");
    }
}

export const produccionService = {
    obtenerTodos: function () {
        return produccionRepository.obtenerTodos();
    },
    crear: function (produccion) {
        validar(produccion, true);
        return produccionRepository.crear(produccion);
    },
    actualizar: function (id, produccion) {
        validar(produccion, false);
        return produccionRepository.actualizar(id, produccion);
    },
    eliminar: function (id) {
        return produccionRepository.eliminar(id);
    }
};