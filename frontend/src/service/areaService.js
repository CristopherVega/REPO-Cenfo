import { areaRepository } from "../repositories/areaRepository";

function validarRegistro(area) {
 

    if (!area.nombre || area.nombre.trim() === "") {
        throw new Error("El nombre es obligatorio");
    }
}

export const areaService={
    obtenerTodos: function(){
        return areaRepository.obtenerTodos();
    },
    crear:function(area){
        validarRegistro(area);
        return areaRepository.crear(area);
    },
    actualizar:function(area){
        validarRegistro(area);
        return areaRepository.actualizar(area);
    },
    eliminar: function(areaID){
        return areaRepository.eliminar(areaID)
    }
}