import { FaTimes } from "react-icons/fa"

function TablaFiltros({
    busqueda, onCambiarBusqueda,
    tipos, tipoSelecionado, onCambiarTipo,
    carreras, carreraSeleccionada, onCambiarCarrera,
    areas, areaSeleccionada, onCambiarArea,
    anios, anioSeleccionado, onCambiarAnio,
    onLimpiarFiltros
}) {

    return (
        <>
            <div className="container-fluid-custom">

                <aside className="aside-filtros">
                    <h5 className="mb-4">Filtros</h5>

                    <div className="filtro-grupo">
                        <h6>Buscar</h6>
                        <input type="text" id="buscar" className="form-control form-control-sm" placeholder="Titulo o Autor..."
                            value={busqueda} onChange={(e) => onCambiarBusqueda(e.target.value)} />
                    </div>

                    <div className="filtro-grupo">
                        <h6>Tipo</h6>
                        {tipos.map((t) => (
                            <label key={t.id}>
                                <input type="checkbox" className="filtro-tipo" value={t.nombre}
                                    checked={tipoSelecionado.includes(t.nombre)}
                                    onChange={() => onCambiarTipo(t.nombre)} />
                                {t.nombre}
                            </label>
                        ))}
                    </div>

                    <div className="filtro-grupo">
                        <h6>Carrera</h6>
                        {carreras.map((c) => (
                            <label key={c.id}>
                                <input type="checkbox" className="filtro-tipo" value={c.nombre}
                                    checked={carreraSeleccionada.includes(c.nombre)}
                                    onChange={() => onCambiarCarrera(c.nombre)} />
                                {c.nombre}
                            </label>
                        ))}
                    </div>

                    <div className="filtro-grupo">
                        <h6>Area de conocimiento</h6>
                        {areas.map((a) => (
                            <label key={a.id}>
                                <input type="checkbox" className="filtro-tipo" value={a.nombre}
                                    checked={areaSeleccionada.includes(a.nombre)}
                                    onChange={() => onCambiarArea(a.nombre)} />
                                {a.nombre}
                            </label>
                        ))}
                    </div>

                    <div className="filtro-grupo">
                        <h6>Año</h6>
                        {anios.map((anio) => (
                            <label key={anio}>
                                <input type="checkbox" className="filtro-tipo" value={anio}
                                    checked={anioSeleccionado.map(String).includes(String(anio))}
                                    onChange={() => onCambiarAnio(anio)} />
                                {anio}
                            </label>
                        ))}
                        {anios.length === 0 && <small className="text-muted">Sin datos aún</small>}
                    </div>

                    <button className="btn btn-outline-secondary btn-limpiar-filtros" onClick={onLimpiarFiltros}>
                        <FaTimes /> Limpiar Filtros
                    </button>
                </aside>

            </div>
        </>
    )
}

export default TablaFiltros;