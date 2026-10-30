const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Area",
    tableName: "areas_conocimiento",
    columns: {
        id_area: { type: "int", primary: true, generated: true },
        nombre: { type: "varchar", length: 100 }
    },
    relations: {
        producciones: {
            type: "one-to-many",
            target: "Produccion_Academica",
            inverseSide: "area"
        }
    }
});