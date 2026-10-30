const {AppDataSource}= require("../config/data-source");
const tipoProduccion=require("../entities/tipoProduccion");

function mapearTipoProduccion(tipo){
    return{
        id:tipo.id_tipo_produccion,
        nombre: tipo.nombre,
        descripcion: tipo.descripcion
    };
}

async function obtenerTodos() {
    const repo= AppDataSource.getRepository(tipoProduccion);
    const tiposProduccion= await repo.find();
    return tiposProduccion.map(mapearTipoProduccion);
}

async function crear(tipo) {
    const repo=AppDataSource.getRepository(tipoProduccion);
    const nuevo=  repo.create(tipo);
    const guardado= await repo.save(nuevo);
    return mapearTipoProduccion(guardado);
}

async function eliminar(id) {
    const repo= AppDataSource.getRepository(tipoProduccion);
    const resultado= await repo.delete({id_tipo_produccion:id});

    if(resultado.affected===0){
        throw new Error("Tipo de produccion no encontrado")
    }
}


module.exports={obtenerTodos,crear,eliminar};