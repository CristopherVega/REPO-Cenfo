const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "TipoInvestigacion",
    tableName: "tipos_investigacion",
    columns: {
        id_tipo_investigacion: { type: "int", primary: true, generated: true },
        nombre: { type: "varchar", length: 100 }
    },
    relations: {
        producciones: {
            type: "one-to-many",
            target: "Produccion_Academica",
            inverseSide: "tipoInvestigacion"
        }
    }
});