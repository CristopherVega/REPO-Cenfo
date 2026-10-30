const URL_API = "https://api.openalex.org/works";

async function manejarRespuesta(respuesta) {
    if (!respuesta.ok) {
        if (respuesta.status === 401 || respuesta.status === 403) {
            throw new Error("Falta configurar VITE_OPENALEX_API_KEY en el .env del frontend");
        }
        throw new Error("No se pudo consultar OpenAlex");
    }
    return respuesta.json();
}

export const openAlexRepository = {
    buscarPorTexto: function (texto) {
        const apiKey = import.meta.env.VITE_OPENALEX_API_KEY;

        const parametros = new URLSearchParams({
            search: texto,
            per_page: "10",
            api_key: apiKey || ""
        });

        return fetch(`${URL_API}?${parametros.toString()}`).then(manejarRespuesta);
    }
};