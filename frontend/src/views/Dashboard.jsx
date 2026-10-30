import { useEffect, useState } from "react";
import { useRol } from "../context/RolContext";

const URL_REPORTES = "http://localhost:3000/api/reportes";

function GraficoBarras({ titulo, datos }) {
    const maximo = Math.max(...datos.map((dato) => Number(dato.total)), 1);

    return (
        <article className="card h-100 p-3">
            <h5 className="mb-3">{titulo}</h5>
            {datos.length === 0 ? <p className="text-muted mb-0">Sin datos disponibles.</p> : datos.map((dato) => (
                <div className="mb-3" key={dato.etiqueta}>
                    <div className="d-flex justify-content-between gap-3 small mb-1">
                        <span className="text-truncate">{dato.etiqueta}</span><strong>{dato.total}</strong>
                    </div>
                    <div className="progress" role="progressbar" aria-label={dato.etiqueta}>
                        <div className="progress-bar bg-primary" style={{ width: `${(Number(dato.total) / maximo) * 100}%` }} />
                    </div>
                </div>
            ))}
        </article>
    );
}

function Dashboard() {
    const { rol, token } = useRol();
    const [indicadores, setIndicadores] = useState(null);
    const [error, setError] = useState("");
    const autorizado = ["administrador", "coordinador", "docente"].includes(rol);

    useEffect(() => {
        if (!autorizado) return;
        fetch(URL_REPORTES, { headers: { Authorization: `Bearer ${token}` } })
            .then(async (respuesta) => {
                const datos = await respuesta.json();
                if (!respuesta.ok) throw new Error(datos.mensaje);
                setIndicadores(datos);
            })
            .catch((e) => setError(e.message || "No se pudieron cargar los indicadores."));
    }, [autorizado, token]);

    if (!autorizado) return <div className="container mt-5"><div className="alert alert-danger">No tienes permiso para acceder al dashboard.</div></div>;
    if (error) return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
    if (!indicadores) return <p className="container mt-5">Cargando indicadores...</p>;

    return (
        <section className="container my-5">
            <h1 className="mb-4">Dashboard de indicadores</h1>
            <div className="row g-4">
                <div className="col-lg-6"><GraficoBarras titulo="Producción académica por año" datos={indicadores.porAnio} /></div>
                <div className="col-lg-6"><GraficoBarras titulo="Producción académica por carrera" datos={indicadores.porCarrera} /></div>
                <div className="col-lg-6"><GraficoBarras titulo="Producción académica por área" datos={indicadores.porArea} /></div>
                <div className="col-lg-6"><GraficoBarras titulo="Producción académica por línea de investigación" datos={indicadores.porLinea} /></div>
                <div className="col-lg-6"><GraficoBarras titulo="Tecnologías más utilizadas" datos={indicadores.tecnologias} /></div>
            </div>
        </section>
    );
}

export default Dashboard;
