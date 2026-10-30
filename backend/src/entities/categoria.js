const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Categoria",
    tableName: "categorias",
    columns: {
        id_categoria: { type: "int", primary: true, generated: true },
        nombre: { type: "varchar", length: 100 }
    },
    relations: {
        producciones: {
            type: "one-to-many",
            target: "Produccion_Academica",
            inverseSide: "categoria"
        }
    }
});