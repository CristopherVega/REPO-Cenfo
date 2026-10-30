const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Tecnologia",
    tableName: "tecnologias",
    columns: {
        id_tecnologia: { type: "int", primary: true, generated: true },
        nombre: { type: "varchar", length: 100 }
    }
});