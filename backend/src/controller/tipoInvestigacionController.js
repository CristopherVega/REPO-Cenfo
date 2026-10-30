const service=require("../service/tipoInvestigacionService");

async function listar(req, res) {
    try {
        const datos= await service.obtenerTodos();
        res.status(200).json(datos);
    } catch (error) {
        res.status(500).json({mensaje:"Ocurrio un error en el servidor"})
    }
}


async function crear(req, res) {
    try {
       const nuevo = await service.crear(req.body);
       res.status(201).json(nuevo); 
    } catch (error) {
        res.status(400).json({mensaje: error.message})
    }
}

async function eliminar(req, res) {
    try {
        const id= Number(req.params.id);
        await service.eliminar(id);
        res.status(200).json({mensaje:"Tipo de investigacion eliminada"});
    } catch (error) {
        res.status(404).json({mensaje: error.message})
    }
}

module.exports={listar,crear, eliminar};