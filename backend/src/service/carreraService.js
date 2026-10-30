const {AppDataSource}=require("../config/data-source");
const CarreraEntity= require("../entities/carrera");


function mapearCarrera(carrera){
    return{
        id:carrera.id_carrera,
        nombre: carrera.nombre
    };
}

async function obtenerTodos() {
    const repo= AppDataSource.getRepository(CarreraEntity);
    const carrera= await repo.find({
        order:{id_carrera:"ASC"}
    });
    return carrera.map(mapearCarrera);
}

async function crear(carrera) {
    const repo= AppDataSource.getRepository(CarreraEntity);
    const nuevo= repo.create(carrera);
    const guardado=  await repo.save(nuevo);
    return mapearCarrera(guardado);
}

async function eliminar(id) {
    const repo=AppDataSource.getRepository(CarreraEntity);
    const resultado= await repo.delete({id_carrera: id});

    if(resultado.affected===0){
        throw new Error("Usuario no encontrado");
        
    }
}

module.exports= {obtenerTodos,crear,eliminar}