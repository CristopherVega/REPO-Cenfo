import { tecnologiaRepository } from "../repositories/tecnologiasRepository";

function validarRegistro(tecnologias) {
 

    if (!tecnologias.nombre || tecnologias.nombre.trim() === "") {
        throw new Error("El nombre es obligatorio");
    }
}

export const tecnologiasService={
    obtenerTodos: function(){
        return tecnologiaRepository.obtenerTodos();
    },
    crear:function(tecnologias){
        validarRegistro(tecnologias);
        return tecnologiaRepository.crear(tecnologias);
    },
    actualizar:function(tecnologias){
        validarRegistro(tecnologias);
        return tecnologiaRepository.actualizar(tecnologias);
    },
    eliminar: function(tecnologiaID){
        return tecnologiaRepository.eliminar(tecnologiaID)
    }
}