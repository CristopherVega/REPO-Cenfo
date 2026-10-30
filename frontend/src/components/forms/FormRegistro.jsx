import { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import InputPDF from "../InputPDF";
import { carreraService } from "../../service/carreraService";
import { areaService } from "../../service/areaService";
import { categoriasService } from "../../service/categoriasService";
import { investigacionService } from "../../service/investigacion";
import { tipoProduccionService } from "../../service/tipoProduccionService";
import { lineaService } from "../../service/lineaService";
import { tecnologiasService } from "../../service/tecnologiasService";
import BuscadorExterno from "../BuscadorExterno";

const estadoInicial = {
    titulo: "",
    id_tipo_produccion: "",
    id_carrera: "",
    id_area: "",
    id_linea: "",
    id_tipo_investigacion: "",
    id_categoria: "",
    anio: "",
    resumen: "",
    id_tecnologias: []
};

function FormRegistro({ onGuardar }) {
    const [formulario, setFormulario] = useState(estadoInicial);
    const [archivoPDF, setArchivoPDF] = useState(null);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const [tiposProduccion, setTiposProduccion] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [areas, setAreas] = useState([]);
    const [lineas, setLineas] = useState([]);
    const [tiposInvestigacion, setTiposInvestigacion] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tecnologias, setTecnologias] = useState([]);

    useEffect(() => {
        async function cargarOpciones() {
            try {
                const [
                    tiposProduccionData,
                    carrerasData,
                    areasData,
                    lineasData,
                    tiposInvestigacionData,
                    categoriasData,
                    tecnologiasData
                ] = await Promise.all([
                    tipoProduccionService.obtenerTodos(),
                    carreraService.obtenerTodos(),
                    areaService.obtenerTodos(),
                    lineaService.obtenerTodos(),
                    investigacionService.obtenerTodos(),
                    categoriasService.obtenerTodos(),
                    tecnologiasService.obtenerTodos()
                ]);

                setTiposProduccion(tiposProduccionData);
                setCarreras(carrerasData);
                setAreas(areasData);
                setLineas(lineasData);
                setTiposInvestigacion(tiposInvestigacionData);
                setCategorias(categoriasData);
                setTecnologias(tecnologiasData);
            } catch (error) {
                setError("No se pudieron cargar las opciones del formulario");
            }
        }

        cargarOpciones();
    }, []);

    function manejarCambio(e) {
        const nombre = e.target.name;
        const valor = e.target.value;

        setFormulario(function (anterior) {
            return {
                ...anterior,
                [nombre]: valor
            };
        });
    }

    function manejarTecnologias(e) {
        setFormulario((anterior) => ({ ...anterior, id_tecnologias: Array.from(e.target.selectedOptions, (opcion) => opcion.value) }));
    }

    async function manejarEnvio(e) {
        e.preventDefault();

        if (!archivoPDF) {
            setError("Debes adjuntar el PDF del documento");
            return;
        }

        try {
            setError("");
            setCargando(true);
            await onGuardar({ ...formulario, archivo: archivoPDF });
            setFormulario(estadoInicial);
            setArchivoPDF(null);
        } catch (errorCapturado) {
            setError(errorCapturado.message);
        } finally {
            setCargando(false);
        }
    }

    return (
        <>
            <h1 className="text-center mt-5">Registrar Producción Academica</h1>
            <section className="container mt-5 d-flex justify-content-center">

                <div className="form-container">
                    {error && <div className="alert alert-danger">{error}</div>}

                    <BuscadorExterno
                        onSeleccionar={(datos) => setFormulario((anterior) => ({ ...anterior, ...datos }))}
                    />

                    <form id="form-registro" onSubmit={manejarEnvio}>
                        <div className="mb-3">
                            <label htmlFor="titulo" className="form-label">Título</label>
                            <input type="text" className="form-control"
                                id="titulo" name="titulo"
                                value={formulario.titulo}
                                onChange={manejarCambio}
                                placeholder="Ej: Análisis de seguridad en aplicaciones web"
                                required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="id_tipo_produccion" className="form-label">Tipo de producción</label>
                            <select className="form-control"
                                name="id_tipo_produccion" id="id_tipo_produccion"
                                value={formulario.id_tipo_produccion}
                                onChange={manejarCambio}
                                required>
                                <option value="">-- Seleccionar --</option>
                                {tiposProduccion.map((t) => (
                                    <option key={t.id} value={t.id}>{t.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="id_carrera" className="form-label">Carrera</label>
                            <select className="form-control"
                                name="id_carrera" id="id_carrera"
                                value={formulario.id_carrera}
                                onChange={manejarCambio}
                                required>
                                <option value="">-- Seleccionar --</option>
                                {carreras.map((c) => (
                                    <option key={c.id} value={c.id}>{c.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="id_area" className="form-label">Área de Conocimiento</label>
                            <select className="form-control"
                                name="id_area" id="id_area"
                                value={formulario.id_area}
                                onChange={manejarCambio}
                                required>
                                <option value="">-- Seleccionar --</option>
                                {areas.map((a) => (
                                    <option key={a.id} value={a.id}>{a.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="id_linea" className="form-label">Línea de Investigación</label>
                            <select className="form-control"
                                name="id_linea" id="id_linea"
                                value={formulario.id_linea}
                                onChange={manejarCambio}
                                required>
                                <option value="">-- Seleccionar --</option>
                                {lineas.map((l) => (
                                    <option key={l.id} value={l.id}>{l.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="id_tipo_investigacion" className="form-label">Tipo de Investigación</label>
                            <select className="form-control"
                                name="id_tipo_investigacion" id="id_tipo_investigacion"
                                value={formulario.id_tipo_investigacion}
                                onChange={manejarCambio}
                                required>
                                <option value="">-- Seleccionar --</option>
                                {tiposInvestigacion.map((t) => (
                                    <option key={t.id} value={t.id}>{t.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="id_categoria" className="form-label">Categoría</label>
                            <select className="form-control"
                                name="id_categoria" id="id_categoria"
                                value={formulario.id_categoria}
                                onChange={manejarCambio}
                                required>
                                <option value="">-- Seleccionar --</option>
                                {categorias.map((c) => (
                                    <option key={c.id} value={c.id}>{c.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="id_tecnologias" className="form-label">Tecnologías utilizadas</label>
                            <select className="form-select" id="id_tecnologias" multiple value={formulario.id_tecnologias} onChange={manejarTecnologias}>
                                {tecnologias.map((tecnologia) => <option key={tecnologia.id} value={tecnologia.id}>{tecnologia.nombre}</option>)}
                            </select>
                            <small className="text-muted">Usa Ctrl o Cmd para seleccionar varias.</small>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="anio" className="form-label">Año</label>
                            <input type="number" className="form-control"
                                id="anio" name="anio"
                                value={formulario.anio}
                                onChange={manejarCambio}
                                placeholder="Ej: 2026" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="resumen" className="form-label">Resumen</label>
                            <textarea name="resumen" id="resumen"
                                className="form-control"
                                value={formulario.resumen}
                                onChange={manejarCambio}
                                placeholder="Resumen del trabajo ...."></textarea>
                        </div>

                        <InputPDF onArchivoSubido={(file) => setArchivoPDF(file)} />

                        <button type="submit" className="btn-enviar d-inline-flex align-items-center justify-content-center" disabled={cargando}>
                            <FaSave /> {cargando ? "Registrando..." : "Registrar"}
                        </button>
                    </form>
                </div>

            </section>
        </>
    )
}
export default FormRegistro;
