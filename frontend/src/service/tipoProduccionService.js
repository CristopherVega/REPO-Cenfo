import { tipoProduccionRepository } from "../repositories/tipoProduccionRepository";
function validarRegistro(tipoProduccion) {
 

    if (!tipoProduccion.descripcion || tipoProduccion.descripcion.trim() === "") {
        throw new Error("El título es obligatorio");
    }
}

export const tipoProduccionService={
    obtenerTodos: function(){
        return tipoProduccionRepository.obtenerTodos();
    },
    crear:function(tipoProduccion){
        validarRegistro(tipoProduccion);
        return tipoProduccionRepository.crear(tipoProduccion);
    },
    actualizar:function(tipoProduccion){
        validarRegistro(tipoProduccion);
        return tipoProduccionRepository.actualizar(tipoProduccion);
    },
    eliminar: function(produccionID){
        return tipoProduccionRepository.eliminar(produccionID)
    }
}