import { openAlexRepository } from "../repositories/openAlexRepository";

function reconstruirResumen(abstractInvertido){
    if(!abstractInvertido)return "";
    const posiciones= [];

    Object.entries(abstractInvertido).forEach(([palabra, indice])=>{
        indice.forEach((indice)=>{
            posiciones[indice]=palabra;
        })
    })

    return posiciones.join(" ");
}

function normalizarResultado(obra) {
    return {
        idExterno: obra.id,
        titulo: obra.title || "Sin título",
        anio: obra.publication_year || null,
        resumen: reconstruirResumen(obra.abstract_inverted_index),
        autores: (obra.authorships || [])
            .map((a) => a.author?.display_name)
            .filter(Boolean)
            .join(", "),
        conceptos: (obra.concepts || [])
            .slice(0, 5)
            .map((c) => c.display_name),
        urlExterna: obra.doi || obra.id
    };
}
 
export const openAlexService = {
    buscarPorTexto: async function (texto) {
        if (!texto || texto.trim() === "") {
            return [];
        }
        const datos = await openAlexRepository.buscarPorTexto(texto.trim());
        const resultados = datos.results || [];
        return resultados.map(normalizarResultado);
    }
};