const {AppDataSource}= require("../config/data-source");
const tipoInvestigacion=require("../entities/tipoInvestigacion")

function mapearTipoInvestigacion(tipo){
    return{
        id:tipo.id_tipo_investigacion,
        nombre: tipo.nombre,
    };
}

async function obtenerTodos() {
    const repo= AppDataSource.getRepository(tipoInvestigacion);
    const tipos= await repo.find({
        order:{id_tipo_investigacion:"ASC"}
    });
    return tipos.map(mapearTipoInvestigacion);
}

async function crear(tipo) {
    const repo=AppDataSource.getRepository(tipoInvestigacion);
    const nuevo=  repo.create(tipo);
    const guardado= await repo.save(nuevo);
    return mapearTipoInvestigacion(guardado);
}

async function eliminar(id) {
    const repo= AppDataSource.getRepository(tipoInvestigacion);
    const resultado= await repo.delete({id_tipo_investigacion:id});

    if(resultado.affected===0){
        throw new Error("Tipo de produccion no encontrado")
    }
}


module.exports={obtenerTodos,crear,eliminar};