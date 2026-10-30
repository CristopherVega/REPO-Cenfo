const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Usuario",
    tableName: "usuarios",
    columns: {
        id_usuario: { type: "int", primary: true, generated: true },
        nombre: { type: "varchar", length: 100 },
        email: { type: "varchar", length: 150 },
        contrasena: { type: "varchar", length: 255 },   
        rol: { type: "varchar", length: 50 },
        estado: { type: "varchar", length: 20 }
    },
    relations: {
        carrera: {
            type: "many-to-one",
            target: "Carrera",
            joinColumn: { name: "id_carrera" },
            inverseSide: "usuarios"
        }
    }
});