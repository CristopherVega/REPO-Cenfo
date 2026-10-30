require("dotenv").config();
require("reflect-metadata");


const app = require("./app");

const { AppDataSource } = require("./config/data-source");

const puerto = process.env.PORT || 3000;

async function iniciaServidor() {
    try {
        await AppDataSource.initialize();
        console.log("Conexion exitosa con la base de datos ");
        app.listen(puerto, () => console.log(`API en http://localhost:${puerto}`));
    } catch (error) {
        console.log("No fue posible iniciar el servidor" , error.message);
        process.exit(1);
    }
}

iniciaServidor();