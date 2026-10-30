const URL_API = import.meta.env.VITE_URL_API_AUTH || "http://localhost:3000/api/auth";

async function manejarRespuesta(respuesta) {
    let datos = null;
    try {
        datos = await respuesta.json();
    } catch (error) {
        datos = null;
    }

    if (!respuesta.ok) {
        throw new Error((datos && datos.mensaje) || "Ocurrió un error en el servidor");
    }

    return datos;
}

export const authRepository = {
    registrar: function (nombre, contrasena) {
        return fetch(`${URL_API}/registro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, contrasena })
        }).then(manejarRespuesta);
    },

    login: function (correo, contrasena) {
        return fetch(`${URL_API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, contrasena })
        }).then(manejarRespuesta);
    }
};