const {AppDataSource}= require("../config/data-source");
const lineaInvestigacion= require("../entities/lineaInvestigacion");

function mapearLinea(tipo){
    return{
        id:tipo.id_linea,
        nombre: tipo.nombre,
    };
}

async function obtenerTodos() {
    const repo= AppDataSource.getRepository(lineaInvestigacion);
    const linea= await repo.find({
        order:{id_linea:"ASC"}
    });
    return linea.map(mapearLinea);
}

async function crear(tipo) {
    const repo=AppDataSource.getRepository(lineaInvestigacion);
    const nuevo=  repo.create(tipo);
    const guardado= await repo.save(nuevo);
    return mapearLinea(guardado);
}

async function eliminar(id) {
    const repo= AppDataSource.getRepository(lineaInvestigacion);
    const resultado= await repo.delete({id_linea:id});

    if(resultado.affected===0){
        throw new Error("Linea no encontrado")
    }
}


module.exports={obtenerTodos,crear,eliminar};