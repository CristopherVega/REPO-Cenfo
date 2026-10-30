import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import TablaRepos from "../components/tablas/TablaRepos";
import TablaFiltros from "../components/tablas/TablaFiltros";
import { produccionService } from "../service/produccionService";
import { tipoProduccionService } from "../service/tipoProduccionService";
import { carreraService } from "../service/carreraService";
import { areaService } from "../service/areaService";
import { useRol } from "../context/RolContext";
import TablaPaginacion from "../components/TablaPaginacion";

function ListaRepos() {

    const [listaData, setListaData] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [busqueda, setBusqueda] = useState('');
    const [tiposSeleccionados, setTipos] = useState([]);
    const [carreraSelecionada, setCarrera] = useState([]);
    const [areaSeleccionada, setArea] = useState([]);
    const [anioSeleccionado, setAnio] = useState([]);
    const { rol } = useRol();
    const [pagina, setPagina] = useState(1);
    const [porPagina] = useState(10);


    const [tiposProduccion, setTiposProduccion] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [areas, setAreas] = useState([]);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const datos = await produccionService.obtenerTodos();
            setListaData(datos);
        } catch (error) {
            console.error("Error cargando los repositorios:", error);
            setError("No se pudo cargar la lista de producciones");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    useEffect(() => {
        async function cargarOpcionesFiltro() {
            try {
                const [tiposData, carrerasData, areasData] = await Promise.all([
                    tipoProduccionService.obtenerTodos(),
                    carreraService.obtenerTodos(),
                    areaService.obtenerTodos()
                ]);
                setTiposProduccion(tiposData);
                setCarreras(carrerasData);
                setAreas(areasData);
            } catch (error) {
                console.error("Error cargando las opciones de filtro:", error);
            }
        }

        cargarOpcionesFiltro();
    }, []);

  
    const aniosDisponibles = useMemo(() => {
        const anios = listaData.map((r) => r.anio).filter(Boolean);
        return [...new Set(anios)].sort((a, b) => b - a);
    }, [listaData]);

    const tipoToggle = (tipo) => {
        setPagina(1);
        setTipos((prev) =>
            prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
        )
    }

    const carreraToggle = (carrera) => {
        setPagina(1);
        setCarrera((prev) =>
            prev.includes(carrera) ? prev.filter((c) => c !== carrera) : [...prev, carrera]
        )
    }

    const areaToggle = (area) => {
        setPagina(1);
        setArea((prev) =>
            prev.includes(area) ? prev.filter((c) => c !== area) : [...prev, area]
        )
    }

    const anioToggle = (anio) => {
        setPagina(1);
        setAnio((prev) =>
            prev.includes(anio) ? prev.filter((c) => c !== anio) : [...prev, anio]
        )
    }

    const handleLimpiarFiltros = () => {
        setPagina(1);
        setBusqueda('');
        setTipos([]);
        setCarrera([]);
        setArea([]);
        setAnio([]);
    };

    useEffect(() => {
        setPagina(1);
    }, [busqueda])

    const reposFiltrados = useMemo(() => {
        const lista = listaData || [];

        return lista.filter((r) => {
            const termino = busqueda.trim().toLowerCase();
            const titulo = String(r.titulo || "").toLowerCase();
            const autor = String(r.autor?.nombre || "").toLowerCase();

            const busquedaCoincide = !termino || titulo.includes(termino) || autor.includes(termino);

            const tipoCoincide =
                tiposSeleccionados.length === 0 ||
                tiposSeleccionados.includes(r.tipoProduccion?.nombre);

            const carreraCoincide =
                carreraSelecionada.length === 0 ||
                carreraSelecionada.includes(r.carrera?.nombre);

            const areaCoincide =
                areaSeleccionada.length === 0 ||
                areaSeleccionada.includes(r.area?.nombre);

            const anioCoincide =
                anioSeleccionado.length === 0 ||
                anioSeleccionado.map(String).includes(String(r.anio));

            return busquedaCoincide && tipoCoincide && carreraCoincide && areaCoincide && anioCoincide;
        });
    }, [listaData, busqueda, tiposSeleccionados, carreraSelecionada, areaSeleccionada, anioSeleccionado]);

    const maximo = Math.ceil(reposFiltrados.length / porPagina);

    const reposPaginados = useMemo(() => {
        const inicio = (pagina - 1) * porPagina;
        const fin = inicio + porPagina;
        return reposFiltrados.slice(inicio, fin);
    }, [reposFiltrados, pagina, porPagina]);

    return (
        <div className="container-fluid px-5 mt-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Producción Académica</h1>
                {rol && (
                    <Link to="/RegistroRepos">
                        <button className="btn btn-primary d-inline-flex align-items-center gap-2">
                            <FaPlus />
                            <span>Registrar Nueva</span>
                        </button>
                    </Link>
                )}
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="container-fluid-custom">

                <TablaFiltros
                    busqueda={busqueda}
                    onCambiarBusqueda={setBusqueda}
                    tipos={tiposProduccion}
                    tipoSelecionado={tiposSeleccionados}
                    onCambiarTipo={tipoToggle}
                    carreras={carreras}
                    carreraSeleccionada={carreraSelecionada}
                    onCambiarCarrera={carreraToggle}
                    areas={areas}
                    areaSeleccionada={areaSeleccionada}
                    onCambiarArea={areaToggle}
                    anios={aniosDisponibles}
                    anioSeleccionado={anioSeleccionado}
                    onCambiarAnio={anioToggle}
                    onLimpiarFiltros={handleLimpiarFiltros}
                />

                <main className="main-content">
                    {cargando ? (
                        <p>Cargando...</p>
                    ) : (
                        <>
                            <TablaRepos repos={reposPaginados} onCambio={cargarDatos} />

                            {reposFiltrados.length > 0 && (
                                <nav className="paginacion mt-3 d-flex justify-content-center">
                                    <TablaPaginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
                                </nav>
                            )}
                        </>
                    )}
                </main>

            </div>
        </div>
    );
}

export default ListaRepos;
