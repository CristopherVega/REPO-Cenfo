const express= require("express");
const cors= require("cors");
const path= require("path");


const usuarioRoutes= require("./routes/usuarioRoutes");
const carrerasRoutes= require("./routes/carreraRoutes");
const categoriasRoutes= require("./routes/categoriasRoutes");
const tipoProduccionRoutes=require("./routes/tipoProduccionRoutes");
const areaRouter=require("./routes/areaRoutes");
const tecnologiasRouter=require("./routes/tecnologiasRoutes");
const tipoInvestigacionRoutes=require("./routes/tipoInvestigacionRoutes");
const lineaInvestigacionRoutes=require("./routes/lineaInvestigacionRoutes");
const authRoutes= require("./routes/authRoutes");
const produccionRoutes= require("./routes/produccionRoutes");
const reportesRoutes = require("./routes/reportesRoutes");

const app= express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../upload")));


app.get("/", function(req, res){
    res.json({mensaje: "API funcionando"});
})

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/carreras", carrerasRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/tipoProduccion", tipoProduccionRoutes);
app.use("/api/areas", areaRouter);
app.use("/api/tecnologia", tecnologiasRouter);
app.use("/api/tipoInvestigacion", tipoInvestigacionRoutes);
app.use("/api/lineas", lineaInvestigacionRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/producciones", produccionRoutes);
app.use("/api/reportes", reportesRoutes);


app.use(function(req, res){
    res.status(404).json({mensaje:"Ruta no encontrada"});
})

app.use(function(error, req, res, next){
    console.error(error);
    res.status(500).json({mensaje: "Ocurrio un error en el servidpr"})
})

module.exports= app;
