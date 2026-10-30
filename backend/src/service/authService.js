const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AppDataSource } = require("../config/data-source");
const UsuarioEntity = require("../entities/usuario");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRA_EN = "8h";

function quitarAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


function generarUsuarioCorreo(nombreCompleto) {
    const partes = quitarAcentos(nombreCompleto.trim().toLowerCase())
        .replace(/[^a-z\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

    if (partes.length === 0) {
        throw new Error("El nombre no es válido para generar un correo");
    }

    const primeraLetra = partes[0][0];
    const apellido = partes[partes.length - 1];

    return `${primeraLetra}${apellido}`;
}

async function generarCorreoUnico(nombreCompleto) {
    const repo = AppDataSource.getRepository(UsuarioEntity);
    const base = generarUsuarioCorreo(nombreCompleto);

    let intento = 0;
    while (true) {
        const usuarioCorreo = intento === 0 ? base : `${base}${intento}`;
        const correoCompleto = `${usuarioCorreo}@ucenfotec.ac.cr`;

        const existe = await repo.findOneBy({ email: correoCompleto });
        if (!existe) {
            return correoCompleto;
        }
        intento++;
    }
}

async function registrar(nombre, contrasena) {
    if (!nombre || nombre.trim() === "") {
        throw new Error("El nombre es obligatorio");
    }
    if (!contrasena || contrasena.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
    }

    const repo = AppDataSource.getRepository(UsuarioEntity);
    const correo = await generarCorreoUnico(nombre);
    const contrasenaHasheada = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = repo.create({
        nombre: nombre.trim(),
        email: correo,
        contrasena: contrasenaHasheada,
        rol: "estudiante",
        estado: "activo"
    });

    const guardado = await repo.save(nuevoUsuario);

    return {
        id: guardado.id_usuario,
        nombre: guardado.nombre,
        correo: guardado.email, // se le muestra al usuario para que lo guarde
        rol: guardado.rol
    };
}

async function login(correo, contrasena) {
    if (!correo || !contrasena) {
        throw new Error("El correo y la contraseña son obligatorios");
    }

    const repo = AppDataSource.getRepository(UsuarioEntity);
    const usuario = await repo.findOneBy({ email: correo.trim().toLowerCase() });

    if (!usuario) {
        throw new Error("Credenciales inválidas");
    }

    if (usuario.estado !== "activo") {
        throw new Error("El usuario no está activo");
    }

    const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!coincide) {
        throw new Error("Credenciales inválidas");
    }

    const payload = {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        rol: usuario.rol
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRA_EN });

    return {
        token,
        usuario: payload
    };
}

module.exports = { registrar, login };