
const URL_API = import.meta.env.VITE_URL_API_AREAS || "http://localhost:3000/api/areas";

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


export const areaRepository={
    obtenerTodos: function () {
        return fetch(URL_API).then(manejarRespuesta);
    },

    crear:function(area){
        return fetch(URL_API,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${obtenerToken()}`
            },
            body:JSON.stringify(area)
        }).then(manejarRespuesta);
    },

    eliminar:function(areaID){
        return fetch(`${URL_API}/${areaID}`,{
            method:"DELETE",
            headers: { "Authorization": `Bearer ${obtenerToken()}` }
        }).then(manejarRespuesta);
    }
}
