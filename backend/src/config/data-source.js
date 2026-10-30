const { DataSource } = require('typeorm');
const Usuario= require("../entities/usuario");
const Carrera= require("../entities/carrera");
const Categoria=require("../entities/categoria");
const TipoProduccion= require("../entities/tipoProduccion");
const Area= require("../entities/areas");
const Tecnologia=require("../entities/tecnologias");
const TipoInvestigacion= require("../entities/tipoInvestigacion");
const LineaInvestigacion=require("../entities/lineaInvestigacion");
const Producciones= require("../entities/produccionAcademica");


const AppDataSource = new DataSource({
    type: 'mssql',
    host: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    synchronize: false,
    entities: [Usuario, Carrera , Categoria , TipoProduccion, Area, Tecnologia, TipoInvestigacion, LineaInvestigacion, Producciones]
});

module.exports = { AppDataSource };