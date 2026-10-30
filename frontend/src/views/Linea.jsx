import { useEffect, useState, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useRol } from "../context/RolContext";
import { lineaService } from "../service/lineaService";
import Buscador from "../components/Buscador";
import TablaPaginacion from "../components/TablaPaginacion";
import TablaLinea from "../components/tablas/TablaLinea";
import Form1Campo from "../components/forms/Form1Campo";

function Linea() {
    const [listaData, setListaData] = useState([]);
    const { rol } = useRol();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState("");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [busqueda, setBusqueda] = useState('');
    const [pagina, setPagina] = useState(1);
    const [porPagina] = useState(5);


    const cargarDatos = async () => {
        try {
            setCargando(true);
            const datos = await lineaService.obtenerTodos();
            setListaData(datos);
        } catch (error) {
            console.error("Error cargando las lineas:", error);
            setError("No se pudo cargar la lista de lineas");
        } finally {
            setCargando(false);
        }
    };



    useEffect(() => {
        cargarDatos();
    }, []);

    const handleGuardar = async (datosNuevaLinea) => {
        setErrorSubmit("");
        try {
            await lineaService.crear(datosNuevaLinea);
            setMostrarFormulario(false);
            await cargarDatos();
        } catch (error) {
            setErrorSubmit(error.message || "Error al guardar el registro");
        }
    };



    useEffect(() => {
        setPagina(1);
    }, [busqueda]);

    const investigacionesFiltradas = useMemo(() => {
        const lista = listaData || [];
        const termino = busqueda.trim().toLowerCase();

        return lista.filter((r) => {
            const nombre = String(r.nombre || "").toLowerCase();
            return !termino || nombre.includes(termino);
        });
    }, [listaData, busqueda]);

    const maximo = Math.ceil(investigacionesFiltradas.length / porPagina) || 1;

    const investigacionesPaginadas = useMemo(() => {
        const inicio = (pagina - 1) * porPagina;
        const fin = inicio + porPagina;
        return investigacionesFiltradas.slice(inicio, fin);
    }, [investigacionesFiltradas, pagina, porPagina]);

    return (
        <div className="container-fluid px-5 mt-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <h1>Líneas de Investigación</h1>

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

            {errorSubmit && <div className="alert alert-danger mb-3">{errorSubmit}</div>}

            {mostrarFormulario && (
                <div className="mb-4">
                    <h3 className="text-center mt-3">Registrar Línea de Investigación</h3>
                    <Form1Campo onGuardar={handleGuardar} placeholderNombre="Ej: Inteligencia Artificial" />
                </div>
            )}

            <div className="busqueda mb-3">
                <Buscador
                    busqueda={busqueda}
                    onCambiarBusqueda={setBusqueda}
                    placeholder="Buscar Investigación..."
                />
            </div>

            <main className="main-content">
                <TablaLinea investigaciones={investigacionesPaginadas} onEliminado={cargarDatos } />

                {investigacionesFiltradas.length > 0 && (
                    <nav className="paginacion mt-3 d-flex justify-content-center">
                        <TablaPaginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
                    </nav>
                )}
            </main>
        </div>
    );
}

export default Linea;
