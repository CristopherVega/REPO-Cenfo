import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { produccionService } from "../service/produccionService";

const URL_ARCHIVOS = (import.meta.env.VITE_URL_API_PRODUCCIONES || "http://localhost:3000/api/producciones")
    .replace("/api/producciones", "");

function Home() {
    const [repositorios, setRepositorios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function cargarRecientes() {
            try {
                const datos = await produccionService.obtenerTodos();
                setRepositorios(datos.slice(0, 4));
            } catch (error) {
                setError("No se pudieron cargar los envíos recientes.");
            } finally {
                setCargando(false);
            }
        }

        cargarRecientes();
    }, []);

    return (
        <>
            <section className="container my-5">
                <h1 className="text-center">Repo CENFO</h1>
                <p className="text-center mt-5 fs-4">
                    Bienvenidos a Repo CENFO, el repositorio institucional de la Universidad CENFOTEC.
                    Esta plataforma centraliza la producción académica generada por estudiantes, docentes
                    e investigadores, permitiendo consultar tesis, artículos e investigaciones de forma
                    rápida y organizada. Explorá el contenido disponible, filtrá por área de conocimiento
                    o carrera, y descubrí el trabajo académico que se desarrolla dentro de nuestra comunidad.
                </p>
            </section>

            <section className="container mt-5 mb-5">
                <h2 className="text-center mb-4">Envíos recientes</h2>

                {cargando && <p className="text-center">Cargando repositorios...</p>}
                {error && <div className="alert alert-danger">{error}</div>}

                {!cargando && !error && repositorios.length === 0 && (
                    <p className="text-center text-muted">Aún no hay repositorios registrados.</p>
                )}

                {repositorios.map((repo) => (
                    <div className="card mb-4" key={repo.id}>
                        <div className="row g-0">
                            <div className="col-auto d-flex align-items-center p-3">
                                <div
                                    className="bg-primary text-white rounded d-flex align-items-center justify-content-center fw-bold"
                                    style={{ width: "100px", height: "130px" }}
                                >
                                    PDF
                                </div>
                            </div>

                            <div className="col">
                                <div className="card-body">
                                    <span className="badge bg-primary mb-2">
                                        {repo.tipoProduccion?.nombre || "Sin tipo"}
                                    </span>

                                    <h5 className="card-title">
                                        {repo.contenido ? (
                                            <a
                                                href={`${URL_ARCHIVOS}/uploads/${encodeURIComponent(repo.contenido)}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-decoration-none"
                                            >
                                                {repo.titulo}
                                            </a>
                                        ) : repo.titulo}
                                    </h5>

                                    <p className="text-muted small mb-1">
                                        ({repo.anio}) {repo.autor?.nombre || "Autor no disponible"}
                                    </p>

                                    <p className="card-text">
                                        {repo.resumen || "Sin resumen disponible."}
                                    </p>

                                    <small className="text-muted">
                                        {[repo.carrera?.nombre, repo.area?.nombre].filter(Boolean).join(" · ")}
                                    </small>
                                    <div className="mt-3">
                                        <Link to="/ListaRepos" className="btn btn-outline-primary btn-sm">
                                            Ver repositorios
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}

export default Home;
