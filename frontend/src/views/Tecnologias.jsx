import { useEffect, useState, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useRol } from "../context/RolContext";
import { tecnologiasService } from "../service/tecnologiasService";
import Buscador from "../components/Buscador";
import TablaPaginacion from "../components/TablaPaginacion";
import TablaTecnologias from "../components/tablas/TablaTecnologias";
import Form1Campo from "../components/forms/Form1Campo";

function Tecnologias() {
    const [listaData, setListaData] = useState([]);
    const { rol } = useRol();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState(""); 
    const [cargando, setCargando] = useState(true);
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(5);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const datos = await tecnologiasService.obtenerTodos();
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


    
        const handleGuardar = async (datosNuevaTecnologia) => {
            setErrorSubmit("");
            try {
                await tecnologiasService.crear(datosNuevaTecnologia);
                setMostrarFormulario(false);
                await cargarDatos(); 
            } catch (error) {
                setErrorSubmit(error.message || "Error al guardar el registro");
            }
        };

    useEffect(() => {
        setPagina(1);
    }, [busqueda]);

    const tecnologiasFiltradas = useMemo(() => {
        const lista = listaData || [];

        return lista.filter((r) => {
            const termino = busqueda.trim().toLowerCase();
            const nombre = String(r.nombre || "").toLowerCase();


            const busquedaCoincide = !termino || nombre.includes(termino);

            return busquedaCoincide;

        })


    }, [listaData, busqueda])

    const maximo = Math.ceil(tecnologiasFiltradas.length / porPagina);

    const tecnologiasPaginadas = useMemo(() => {
        const inicio = (pagina - 1) * porPagina;
        const fin = inicio + porPagina;
        return tecnologiasFiltradas.slice(inicio, fin);
    }, [tecnologiasFiltradas, pagina, porPagina])
    return (
        <div className="container-fluid px-5 mt-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <h1>Tecnologias</h1>

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
                    <h3 className="text-center mt-3">Registrar Tecnologia</h3>
                    <Form1Campo onGuardar={handleGuardar} placeholderNombre="Ej: JavaScript" />
                </div>
            )}

            <div className="busqueda mb-3">
                <Buscador
                    busqueda={busqueda}
                    onCambiarBusqueda={setBusqueda}
                    placeholder="Buscar Tecnologia .."
                />
            </div>

            <main className="main-content">
                {/* Se pasan los datos recortados por la paginación */}
                <TablaTecnologias tecnologias={tecnologiasPaginadas} onEliminado={cargarDatos} />


                {tecnologiasFiltradas.length > 0 && (
                    <nav className="paginacion mt-3 d-flex justify-content-center">
                        <TablaPaginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
                    </nav>
                )}
            </main>
        </div>
    )
}

export default Tecnologias;
