const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Produccion_Academica",
    tableName: "produccion_academica",
    columns: {
        id_produccion: { type: "int", primary: true, generated: true },
        titulo: { type: "varchar", length: 200 },
        anio: { type: "int" },
        resumen: { type: "varchar", length: "MAX" },
        contenido: { type: "varchar", length: 255 } 
    },
    relations: {
        autor: {
            type: "many-to-one",
            target: "Usuario",
            joinColumn: { name: "id_autor" },
            inverseSide: "producciones"
        },
        tipoProduccion: {
            type: "many-to-one",
            target: "TipoProduccion",
            joinColumn: { name: "id_tipo_produccion" },
            inverseSide: "producciones"
        },
        carrera: {
            type: "many-to-one",
            target: "Carrera",
            joinColumn: { name: "id_carrera" },
            inverseSide: "producciones"
        },
        area: {
            type: "many-to-one",
            target: "Area",
            joinColumn: { name: "id_area" },
            inverseSide: "producciones"
        },
        linea: {
            type: "many-to-one",
            target: "LineaInvestigacion",
            joinColumn: { name: "id_linea" },
            inverseSide: "producciones"
        },
        tipoInvestigacion: {
            type: "many-to-one",
            target: "TipoInvestigacion",
            joinColumn: { name: "id_tipo_investigacion" },
            inverseSide: "producciones"
        },
        categoria: {
            type: "many-to-one",
            target: "Categoria",
            joinColumn: { name: "id_categoria" },
            inverseSide: "producciones"
        },
        tecnologias: {
            type: "many-to-many",
            target: "Tecnologia",
            joinTable: {
                name: "produccion_tecnologia",
                joinColumn: { name: "id_produccion", referencedColumnName: "id_produccion" },
                inverseJoinColumn: { name: "id_tecnologia", referencedColumnName: "id_tecnologia" }
            }
        }
    }
});
