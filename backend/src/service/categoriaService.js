const {AppDataSource}= require("../config/data-source");
const CategoriaEntity=require("../entities/categoria");

function mapearCatgeoria(categoria){
    return{
        id:categoria.id_categoria,
        nombre:categoria.nombre
    };
}

async function obtenerTodos() {
    const repo= AppDataSource.getRepository(CategoriaEntity);
    const categoria= await repo.find({
        order:{id_categoria:"ASC"}
    });
    return categoria.map(mapearCatgeoria);
}


async function crear(categoria) {
    const repo= AppDataSource.getRepository(CategoriaEntity);
    const nuevo= repo.create(categoria);
    const guardado= await repo.save(nuevo);
    return mapearCatgeoria(guardado);
}

async function eliminar(id) {
    const repo= AppDataSource.getRepository(CategoriaEntity);
    const resultado=await repo.delete({id_categoria:id});

    if(resultado.affected===0){
        throw new Error("Categoria no encontrada");
    }
}

module.exports= {obtenerTodos, crear, eliminar};