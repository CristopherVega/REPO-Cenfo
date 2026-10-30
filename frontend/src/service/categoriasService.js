import { categoriasRepository } from "../repositories/categoriasRepository";

function validarRegistro(categorias) {
 

    if (!categorias.nombre || categorias.nombre.trim() === "") {
        throw new Error("El nombre es obligatorio");
    }
}

export const categoriasService={
    obtenerTodos: function(){
        return categoriasRepository.obtenerTodos();
    },
    crear:function(categorias){
        validarRegistro(categorias);
        return categoriasRepository.crear(categorias);
    },
    actualizar:function(categorias){
        validarRegistro(categorias);
        return categoriasRepository.actualizar(categorias);
    },
    eliminar: function(categoriaID){
        return categoriasRepository.eliminar(categoriaID)
    }
}