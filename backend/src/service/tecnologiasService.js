const { AppDataSource } = require("../config/data-source");
const tecnologiaEntity=require("../entities/tecnologias")

function mapearTecnologia(tecnologia) {
    return {
        id: tecnologia.id_tecnologia,
        nombre: tecnologia.nombre
    };
}

async function obtenerTodos() {
    const repo = AppDataSource.getRepository(tecnologiaEntity);
    const tecnologias = await repo.find({
        order: { id_tecnologia: "ASC" }
    });
    return tecnologias.map(mapearTecnologia);
}

async function crear(tecnologia) {
    const repo = AppDataSource.getRepository(tecnologiaEntity);
    const nuevo = repo.create(tecnologia);
    const guardado = await repo.save(nuevo);
    return mapearTecnologia(guardado);
}

async function eliminar(id) {
    const repo = AppDataSource.getRepository(tecnologiaEntity);
    const resultado = await repo.delete({ id_tecnologia: id });

    if (resultado.affected === 0) {
        throw new Error("Tecnología no encontrada");
    }
}

module.exports = { obtenerTodos, crear, eliminar };