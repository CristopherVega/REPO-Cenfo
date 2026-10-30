import { carrerasRepository } from "../repositories/carreraRepository";

function validarRegistro(carrera) {
    if (!carrera.nombre || carrera.nombre.trim() === "") {
        throw new Error("El nombre de la carrera es obligatorio");
    }
}

export const carreraService = {
    obtenerTodos: function () {
        return carrerasRepository.obtenerTodos();
    },
    crear: function (carrera) {
        validarRegistro(carrera);
        return carrerasRepository.crear(carrera);
    },
    eliminar: function (carreraID) {
        return carrerasRepository.eliminar(carreraID);
    }
};