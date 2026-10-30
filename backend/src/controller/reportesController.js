const { AppDataSource } = require("../config/data-source");

const consultas = {
    porAnio: "SELECT anio AS etiqueta, COUNT(*) AS total FROM produccion_academica GROUP BY anio ORDER BY anio",
    porCarrera: "SELECT c.nombre AS etiqueta, COUNT(*) AS total FROM produccion_academica p INNER JOIN carreras c ON c.id_carrera = p.id_carrera GROUP BY c.nombre ORDER BY total DESC",
    porArea: "SELECT a.nombre AS etiqueta, COUNT(*) AS total FROM produccion_academica p INNER JOIN areas_conocimiento a ON a.id_area = p.id_area GROUP BY a.nombre ORDER BY total DESC",
    porLinea: "SELECT l.nombre AS etiqueta, COUNT(*) AS total FROM produccion_academica p INNER JOIN lineas_investigacion l ON l.id_linea = p.id_linea GROUP BY l.nombre ORDER BY total DESC",
    tecnologias: "SELECT t.nombre AS etiqueta, COUNT(*) AS total FROM produccion_tecnologia pt INNER JOIN tecnologias t ON t.id_tecnologia = pt.id_tecnologia GROUP BY t.nombre ORDER BY total DESC"
};

async function obtenerIndicadores(req, res) {
    try {
        const entradas = await Promise.all(Object.entries(consultas).map(async ([clave, consulta]) => {
            try {
                return [clave, await AppDataSource.query(consulta)];
            } catch (error) {
                console.warn(`Indicador no disponible: ${clave}`, error.message);
                return [clave, []];
            }
        }));
        const indicadores = Object.fromEntries(entradas);
        res.json(indicadores);
    } catch (error) {
        console.error("Error al generar reportes:", error);
        res.status(500).json({ mensaje: "No se pudieron generar los indicadores" });
    }
}

module.exports = { obtenerIndicadores };
