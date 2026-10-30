import { useEffect, useState, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useRol } from "../context/RolContext";
import TablaPaginacion from "../components/TablaPaginacion";
import TablaTipoProduccion from "../components/tablas/TablaTipoProduccion";
import Buscador from "../components/Buscador";
import FormProduccion from "../components/forms/FormProduccion";
import { tipoProduccionService } from "../service/tipoProduccionService";

function Produccion() {
    const [listaData, setListaData] = useState([]);
    const { rol } = useRol();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState("");
    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(5);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const datos = await tipoProduccionService.obtenerTodos();
            setListaData(datos);
        } catch (error) {
            console.error("Error cargando los usuarios:", error);
            setError("No se pudo cargar la lista de usuarios");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);


        const handleGuardar = async (datosNuevaProduccion) => {
            setErrorSubmit("");
            try {
                await tipoProduccionService.crear(datosNuevaProduccion);
                setMostrarFormulario(false);
                await cargarDatos(); 
            } catch (error) {
                setErrorSubmit(error.message || "Error al guardar el registro");
            }
        };

    // Reinicia a la página 1 cuando se realiza una búsqueda
    useEffect(() => {
        setPagina(1);
    }, [busqueda]);

    // Filtrado de la lista según la búsqueda
    const produccionFiltrada = useMemo(() => {
        const lista = listaData || [];
        const termino = busqueda.trim().toLowerCase();

        return lista.filter((item) => {
            const nombre = String(item.nombre || "").toLowerCase();


            return !termino || nombre.includes(termino);
        });
    }, [listaData, busqueda]);

    // Cálculo de la paginación
    const maximo = Math.ceil(produccionFiltrada.length / porPagina) || 1;

    const datosPaginados = useMemo(() => {
        const inicio = (pagina - 1) * porPagina;
        const fin = inicio + porPagina;
        return produccionFiltrada.slice(inicio, fin);
    }, [produccionFiltrada, pagina, porPagina]);

    return (
        <div className="container-fluid px-5 mt-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <h1>Tipos de Producción</h1>

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
                    <h3 className="text-center mt-3">Registrar Tipo de Produccion</h3>
                    <FormProduccion onGuardar={handleGuardar} />
                </div>
            )}

            <div className="busqueda mb-3">
                <Buscador
                    busqueda={busqueda}
                    onCambiarBusqueda={setBusqueda}
                    placeholder="Buscar tipo .."
                />
            </div>

            <main className="main-content">
                {/* Se pasan los datos recortados por la paginación */}
                <TablaTipoProduccion tipoProduccion={datosPaginados} onEliminado={cargarDatos} />

                {produccionFiltrada.length > 0 && (
                    <nav className="paginacion mt-3 d-flex justify-content-center">
                        <TablaPaginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
                    </nav>
                )}
            </main>
        </div>
    );
}

export default Produccion;
