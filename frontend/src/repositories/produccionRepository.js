const URL_API = import.meta.env.VITE_URL_API_PRODUCCIONES || "http://localhost:3000/api/producciones";

function obtenerToken() {
    try {
        const sesion = JSON.parse(localStorage.getItem("sesion"));
        return sesion ? sesion.token : null;
    } catch (error) {
        return null;
    }
}

function armarFormData(produccion) {
    const formData = new FormData();

    formData.append("titulo", produccion.titulo);
    formData.append("anio", produccion.anio);
    formData.append("resumen", produccion.resumen);
    formData.append("id_tipo_produccion", produccion.id_tipo_produccion);
    formData.append("id_carrera", produccion.id_carrera);
    formData.append("id_area", produccion.id_area);
    formData.append("id_linea", produccion.id_linea);
    formData.append("id_tipo_investigacion", produccion.id_tipo_investigacion);
    formData.append("id_categoria", produccion.id_categoria);
    formData.append("id_tecnologias", JSON.stringify(produccion.id_tecnologias || []));

    if (produccion.archivo) {
        formData.append("contenido", produccion.archivo); 
    }

    return formData;
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

export const produccionRepository = {
    obtenerTodos: function () {
        return fetch(URL_API).then(manejarRespuesta);
    },

    crear: function (produccion) {
        return fetch(URL_API, {
            method: "POST",
            headers: { "Authorization": `Bearer ${obtenerToken()}` }, 
            body: armarFormData(produccion)
        }).then(manejarRespuesta);
    },

    actualizar: function (id, produccion) {
        return fetch(`${URL_API}/${id}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${obtenerToken()}` },
            body: armarFormData(produccion)
        }).then(manejarRespuesta);
    },

    eliminar: function (id) {
        return fetch(`${URL_API}/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${obtenerToken()}` }
        }).then(manejarRespuesta);
    }
};
