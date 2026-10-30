const { AppDataSource } = require("../config/data-source");
const carrera = require("../entities/carrera");
const categoria = require("../entities/categoria");
const ProduccionEntity = require("../entities/produccionAcademica");

function mapearProduccion(p) {
    return {
        id: p.id_produccion,
        titulo: p.titulo,
        anio: p.anio,
        resumen: p.resumen,
        contenido: p.contenido,
        autor: p.autor ? { id: p.autor.id_usuario, nombre: p.autor.nombre } : null,
        tipoProduccion: p.tipoProduccion ? { id: p.tipoProduccion.id_tipo_produccion, nombre: p.tipoProduccion.nombre } : null,
        carrera: p.carrera ? { id: p.carrera.id_carrera, nombre: p.carrera.nombre } : null,
        area: p.area ? { id: p.area.id_area, nombre: p.area.nombre } : null,
        linea: p.linea ? { id: p.linea.id_linea, nombre: p.linea.nombre } : null,
        tipoInvestigacion: p.tipoInvestigacion ? { id: p.tipoInvestigacion.id_tipo_investigacion, nombre: p.tipoInvestigacion.nombre } : null,
        categoria: p.categoria ? { id: p.categoria.id_categoria, nombre: p.categoria.nombre } : null
        ,tecnologias: (p.tecnologias || []).map((t) => ({ id: t.id_tecnologia, nombre: t.nombre }))
    };
}

async function obtenerTodos() {
    const repo = AppDataSource.getRepository(ProduccionEntity);
    const producciones = await repo.find({
        order: { id_produccion: "DESC" },
        relations: { autor: true, tipoProduccion: true, carrera: true, area: true, linea: true, tipoInvestigacion: true, categoria: true, tecnologias: true }
    });
    return producciones.map(mapearProduccion);
}

async function crear(datos) {
    const repo = AppDataSource.getRepository(ProduccionEntity);

    const tecnologias = JSON.parse(datos.id_tecnologias || "[]").map((id) => ({ id_tecnologia: Number(id) }));
    const nuevo = repo.create({
        titulo: datos.titulo,
        anio: Number(datos.anio),
        resumen: datos.resumen,
        contenido: datos.contenido, 
        autor: { id_usuario: Number(datos.id_autor) },
        tipoProduccion: { id_tipo_produccion: Number(datos.id_tipo_produccion) },
        carrera: { id_carrera: Number(datos.id_carrera) },
        area: { id_area: Number(datos.id_area) },
        linea: { id_linea: Number(datos.id_linea) },
        tipoInvestigacion: { id_tipo_investigacion: Number(datos.id_tipo_investigacion) },
        categoria: { id_categoria: Number(datos.id_categoria) },
        tecnologias
    });

    const guardado = await repo.save(nuevo);

    const completo = await repo.findOne({
        where: { id_produccion: guardado.id_produccion },
        relations: { autor: true, tipoProduccion: true, carrera: true, area: true, linea: true, tipoInvestigacion: true, categoria: true, tecnologias: true }
    });

    return mapearProduccion(completo);
}

async function actualizar(id, datos) {
    const repo = AppDataSource.getRepository(ProduccionEntity);
    const existente = await repo.findOneBy({ id_produccion: id });

    if (!existente) {
        throw new Error("Producción no encontrada");
    }

    const camposSimples = ["titulo", "resumen"];
    camposSimples.forEach(function (campo) {
        if (datos[campo] !== undefined) existente[campo] = datos[campo];
    });

    if (datos.anio !== undefined) existente.anio = Number(datos.anio);
    if (datos.contenido !== undefined) existente.contenido = datos.contenido;

    if (datos.id_tipo_produccion !== undefined) existente.tipoProduccion = { id_tipo_produccion: Number(datos.id_tipo_produccion) };
    if (datos.id_carrera !== undefined) existente.carrera = { id_carrera: Number(datos.id_carrera) };
    if (datos.id_area !== undefined) existente.area = { id_area: Number(datos.id_area) };
    if (datos.id_linea !== undefined) existente.linea = { id_linea: Number(datos.id_linea) };
    if (datos.id_tipo_investigacion !== undefined) existente.tipoInvestigacion = { id_tipo_investigacion: Number(datos.id_tipo_investigacion) };
    if (datos.id_categoria !== undefined) existente.categoria = { id_categoria: Number(datos.id_categoria) };
    if (datos.id_tecnologias !== undefined) existente.tecnologias = JSON.parse(datos.id_tecnologias).map((id) => ({ id_tecnologia: Number(id) }));

    await repo.save(existente);

    const actualizado = await repo.findOne({
        where: { id_produccion: id },
        relations: { autor: true, tipoProduccion: true, carrera: true, area: true, linea: true, tipoInvestigacion: true, categoria: true, tecnologias: true }
    });

    return mapearProduccion(actualizado);
}

async function eliminar(id) {
    const repo = AppDataSource.getRepository(ProduccionEntity);

    const registro = await repo.findOneBy({ id_produccion: id });
    if (!registro) {
        throw new Error("Producción no encontrada");
    }

    await repo.delete({ id_produccion: id });
    return registro;
}

module.exports = { obtenerTodos, crear, actualizar, eliminar };
