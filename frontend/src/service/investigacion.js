import { tipoInvestigacionRepository } from "../repositories/investigacion";
function validarRegistro(investigacion) {
 

    if (!investigacion.nombre || investigacion.nombre.trim() === "") {
        throw new Error("El nombre es obligatorio");
    }
}

export const investigacionService={
    obtenerTodos: function(){
        return tipoInvestigacionRepository.obtenerTodos();
    },
    crear:function(investigacion){
        validarRegistro(investigacion);
        return tipoInvestigacionRepository.crear(investigacion);
    },
    actualizar:function(investigacion){
        validarRegistro(investigacion);
        return tipoInvestigacionRepository.actualizar(investigacion);
    },
    eliminar: function(investigacionID){
        return tipoInvestigacionRepository.eliminar(investigacionID)
    }
}