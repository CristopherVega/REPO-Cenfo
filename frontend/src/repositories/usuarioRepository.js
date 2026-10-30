const URL_API = import.meta.env.VITE_URL_API_USUARIOS || "http://localhost:3000/api/usuarios";

function obtenerToken() {
    try {
        const sesion = JSON.parse(localStorage.getItem("sesion"));
        return sesion ? sesion.token : null;
    } catch (error) {
        return null;
    }
}

function encabezadosConToken() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${obtenerToken()}`
    };
}

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

export const usuarioRepository = {
    obtenerTodos: function () {
        return fetch(URL_API, {
            headers: encabezadosConToken()
        }).then(manejarRespuesta);
    },

    actualizar: function (usuarioID, datos) {
        return fetch(`${URL_API}/${usuarioID}`, {
            method: "PUT",
            headers: encabezadosConToken(),
            body: JSON.stringify(datos)
        }).then(manejarRespuesta);
    },

    eliminar: function (usuarioID) {
        return fetch(`${URL_API}/${usuarioID}`, {
            method: "DELETE",
            headers: encabezadosConToken()
        }).then(manejarRespuesta);
    }
};