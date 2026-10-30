const URL_API = import.meta.env.VITE_URL_API_LINEAS|| "http://localhost:3000/api/lineas";

function obtenerToken() {
    try {
        const sesion = JSON.parse(localStorage.getItem("sesion"));
        return sesion ? sesion.token : null;
    } catch (error) {
        return null;
    }
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

export const lineaRepository = {
    obtenerTodos: function () {
        return fetch(URL_API).then(manejarRespuesta);
    },

    crear: function (linea) {
        return fetch(URL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${obtenerToken()}`
            },
            body: JSON.stringify(linea)
        }).then(manejarRespuesta);
    },

    eliminar: function (lineaID) {
        return fetch(`${URL_API}/${lineaID}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${obtenerToken()}` }
        }).then(manejarRespuesta);
    }
};
