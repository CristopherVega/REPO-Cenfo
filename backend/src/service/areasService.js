const { AppDataSource } = require("../config/data-source");
const areaEntity = require("../entities/areas");

function mapearArea(area) {
    return {
        id: area.id_area,
        nombre: area.nombre
    }
}
async function obtenerTodos() {
    const repo = AppDataSource.getRepository(areaEntity);
    const area = await repo.find({
        order:{id_area:"ASC"}
    });
    return area.map(mapearArea);
}

async function crear(area) {
    const repo = AppDataSource.getRepository(areaEntity);
    const nuevo = repo.create(area);
    const guardado = await repo.save(nuevo);
    return mapearArea(guardado);
}

async function eliminar(id) {
    const repo = AppDataSource.getRepository(areaEntity);
    const resultado = await repo.delete({ id_area: id })

    if (resultado.affected === 0) {
        throw new Error("Area no encontrado");

    }
}

module.exports={obtenerTodos,crear,eliminar};