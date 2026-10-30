import { useEffect, useState, useMemo } from "react";
import { usuarioService } from "../service/usuarioService";
import Buscador from "../components/Buscador";
import TablaPaginacion from "../components/TablaPaginacion";
import TablaUsuarios from "../components/tablas/TablaUsuarios";

function Usuarios() {

    const [listaData, setListaData] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [busqueda, setBusqueda] = useState('');
    const [pagina, setPagina] = useState(1);
    const [porPagina] = useState(5);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const datos = await usuarioService.obtenerTodos();
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

    useEffect(() => {
        setPagina(1);
    }, [busqueda]);

    const usuariosFiltrados = useMemo(() => {
        const lista = listaData || [];

        return lista.filter((r) => {
            const termino = busqueda.trim().toLowerCase();
            const nombre = String(r.nombre || "").toLowerCase();
            const email = String(r.email || "").toLowerCase();

            return !termino || nombre.includes(termino) || email.includes(termino);
        });
    }, [listaData, busqueda]);

    const maximo = Math.ceil(usuariosFiltrados.length / porPagina);

    const usuariosPaginados = useMemo(() => {
        const inicio = (pagina - 1) * porPagina;
        const fin = inicio + porPagina;
        return usuariosFiltrados.slice(inicio, fin);
    }, [usuariosFiltrados, pagina, porPagina]);

    return (
        <div className="container-fluid px-5 mt-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mt-4">
                <h1>Usuarios</h1>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <div className="busqueda">
                <Buscador busqueda={busqueda} onCambiarBusqueda={setBusqueda} placeholder="Nombre o Correo ...." />
            </div>

            {cargando ? (
                <p className="mt-3">Cargando...</p>
            ) : (
                <main className="main-content">
                    <TablaUsuarios usuarios={usuariosPaginados} onCambio={cargarDatos} />

                    {usuariosFiltrados.length > 0 && (
                        <nav className="paginacion mt-3 d-flex justify-content-center">
                            <TablaPaginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
                        </nav>
                    )}
                </main>
            )}
        </div>
    );
}

export default Usuarios;