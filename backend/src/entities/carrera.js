const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Carrera",
    tableName: "carreras",
    columns: {
        id_carrera: { type: "int", primary: true, generated: true },
        nombre: { type: "varchar", length: 100 }
    },
    relations: {
        usuarios: {
            type: "one-to-many",
            target: "Usuario",
            inverseSide: "carrera"
        },
        producciones: {
            type: "one-to-many",
            target: "Produccion_Academica",
            inverseSide: "carrera"
        }
    }
});