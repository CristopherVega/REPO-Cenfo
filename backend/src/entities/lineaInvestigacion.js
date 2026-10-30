const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "LineaInvestigacion",
    tableName: "lineas_investigacion",
    columns: {
        id_linea: { type: "int", primary: true, generated: true },
        nombre: { type: "varchar", length: 100 }
    },
    relations: {
        producciones: {
            type: "one-to-many",
            target: "Produccion_Academica",
            inverseSide: "linea"
        }
    }
});