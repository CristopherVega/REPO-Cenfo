const authService=require("../service/authService")
async function registrar(req, res) {
    try {
        const { nombre, contrasena } = req.body;
        const usuario = await authService.registrar(nombre, contrasena);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
}

async function login(req, res) {
    try {
        const { correo, contrasena } = req.body;
        const resultado = await authService.login(correo, contrasena);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(401).json({ mensaje: error.message });
    }
}

module.exports = { registrar, login };