import { Link } from "react-router-dom";
import { useRol } from "../context/RolContext";
import { useEffect, useState, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { areaService } from "../service/areaService";
import Buscador from "../components/Buscador";
import TablaPaginacion from "../components/TablaPaginacion";
import TablaAreas from "../components/tablas/TablaAreas";
import Form1Campo from "../components/forms/Form1Campo";

function Area() {
    const [listaData, setListaData] = useState([]);
    const { rol } = useRol();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(5);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const datos = await areaService.obtenerTodos();
            setListaData(datos);
        } catch (error) {
            console.error("Error cargando las areas:", error);
            setError("No se pudo cargar la lista de areas");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleGuardar = async (datosNuevaArea) => {
        setErrorSubmit("");
        try {
            await areaService.crear(datosNuevaArea);
            setMostrarFormulario(false);
            await cargarDatos();
        } catch (error) {
            setErrorSubmit(error.message || "Error al guardar el registro");
        }
    };

    useEffect(() => {
        setPagina(1);
    }, [busqueda]);

    const areasFiltradas = useMemo(() => {
        const lista = listaData || [];

        return lista.filter((r) => {
            const termino = busqueda.trim().toLowerCase();
            const nombre = String(r.nombre || "").toLowerCase();


            const busquedaCoincide = !termino || nombre.includes(termino);

            return busquedaCoincide;

        })


    }, [listaData, busqueda])

    const maximo = Math.ceil(areasFiltradas.length / porPagina);

    const areasPaginadas = useMemo(() => {
        const inicio = (pagina - 1) * porPagina;
        const fin = inicio + porPagina;
        return areasFiltradas.slice(inicio, fin);
    }, [areasFiltradas, pagina, porPagina])

    return (
        <div className="container-fluid px-5 mt-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <h1>Areas</h1>

                {(rol === 'administrador' || rol === 'coordinador') && (
                    <button
                        className="btn btn-primary d-inline-flex align-items-center gap-2"
                        onClick={() => setMostrarFormulario(!mostrarFormulario)}
                    >
                        <FaPlus />
                        <span>{mostrarFormulario ? "Cerrar Formulario" : "Registrar Nuevo"}</span>
                    </button>
                )}
            </div>

            {errorSubmit && <div className="alert alert-danger">{errorSubmit}</div>}

            {mostrarFormulario && (
                <div className="mb-4">
                    <h3 className="text-center mt-3">Registrar Area</h3>
                    <Form1Campo onGuardar={handleGuardar} placeholderNombre="Ej: Ciberseguridad" />
                </div>
            )}

            <div className="busqueda mb-3">
                <Buscador
                    busqueda={busqueda}
                    onCambiarBusqueda={setBusqueda}
                    placeholder="Buscar Area .."
                />
            </div>

            <main className="main-content">
                {/* Se pasan los datos recortados por la paginación */}
                <TablaAreas areas={areasPaginadas} onEliminado={cargarDatos} />


                {areasFiltradas.length > 0 && (
                    <nav className="paginacion mt-3 d-flex justify-content-center">
                        <TablaPaginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
                    </nav>
                )}
            </main>
        </div>
    )
}

export default Area;
