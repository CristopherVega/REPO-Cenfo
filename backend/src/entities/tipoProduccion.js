const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "TipoProduccion",
    tableName: "tipos_produccion",
    columns: {
        id_tipo_produccion: { type: "int", primary: true, generated: true },
        nombre: { type: "varchar", length: 100 },
        descripcion: { type: "varchar", length: 200 }
    },
    relations: {
        producciones: {
            type: "one-to-many",
            target: "Produccion_Academica",
            inverseSide: "tipoProduccion"
        }
    }
});