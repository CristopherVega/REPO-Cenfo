import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { openAlexService } from "../service/openAlexService";

function BuscadorExterno({ onSeleccionar }) {
    const [texto, setTexto] = useState("");
    const [resultados, setResultados] = useState([]);
    const [buscando, setBuscando] = useState(false);
    const [error, setError] = useState("");
    const [mostrarBuscador, setMostrarBuscador] = useState(false);

    async function manejarBusqueda(e) {
        e.preventDefault();
        try {
            setError("");
            setBuscando(true);
            const datos = await openAlexService.buscarPorTexto(texto);
            setResultados(datos);
        } catch (error) {
            setError("No se pudo buscar en OpenAlex, intenta de nuevo");
        } finally {
            setBuscando(false);
        }
    }

    function manejarSeleccion(resultado) {
        onSeleccionar({
            titulo: resultado.titulo,
            anio: resultado.anio || "",
            resumen: resultado.resumen
        });
        setResultados([]);
        setTexto("");
        setMostrarBuscador(false);
    }

    return (
        <div className="mb-4 border rounded p-3 bg-light">
            <button
                type="button"
                className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-2 mb-2"
                onClick={() => setMostrarBuscador(!mostrarBuscador)}
            >
                <FaSearch /> {mostrarBuscador ? "Ocultar búsqueda externa" : "Buscar en OpenAlex (opcional)"}
            </button>

            {mostrarBuscador && (
                <>
                    <p className="text-muted small mb-2">
                        Busca un trabajo similar publicado en el mundo real para autocompletar título, año y resumen.
                    </p>

                    <form className="d-flex gap-2 mb-3" onSubmit={manejarBusqueda}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ej: seguridad en aplicaciones web"
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary" disabled={buscando}>
                            {buscando ? "Buscando..." : "Buscar"}
                        </button>
                    </form>

                    {error && <div className="alert alert-danger">{error}</div>}

                    {resultados.length > 0 && (
                        <div className="list-group">
                            {resultados.map((r) => (
                                <div key={r.idExterno} className="list-group-item">
                                    <h6 className="mb-1">{r.titulo}</h6>
                                    <small className="text-muted d-block">
                                        {r.autores || "Autor desconocido"} · {r.anio || "Sin año"}
                                    </small>
                                    {r.conceptos.length > 0 && (
                                        <div className="mt-1">
                                            {r.conceptos.map((c) => (
                                                <span key={c} className="badge bg-secondary me-1">{c}</span>
                                            ))}
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-success mt-2"
                                        onClick={() => manejarSeleccion(r)}
                                    >
                                        Usar este
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default BuscadorExterno;