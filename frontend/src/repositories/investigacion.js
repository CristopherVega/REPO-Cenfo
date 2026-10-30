const URL_API = import.meta.env.VITE_URL_API_INVESTIGACION || "http://localhost:3000/api/tipoInvestigacion";

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

export const tipoInvestigacionRepository = {
    obtenerTodos: function () {
        return fetch(URL_API).then(manejarRespuesta);
    },

    crear: function (tipoProduccion) {
        return fetch(URL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${obtenerToken()}`
            },
            body: JSON.stringify(tipoProduccion)
        }).then(manejarRespuesta);
    },

    eliminar: function (tipoProduccionID) {
        return fetch(`${URL_API}/${tipoProduccionID}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${obtenerToken()}` }
        }).then(manejarRespuesta);
    }
};
