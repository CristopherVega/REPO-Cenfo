import { Modal, ModalHeader, ModalBody, ModalTitle } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import InputPDF from "../InputPDF";
import { carreraService } from "../../service/carreraService";
import { areaService } from "../../service/areaService";
import { categoriasService } from "../../service/categoriasService";
import { investigacionService } from "../../service/investigacion";
import { tipoProduccionService } from "../../service/tipoProduccionService";
import { lineaService } from "../../service/lineaService";

function Editar({ repos, show, onCerrar, onGuardar }) {

    const [formData, setFormData] = useState({
        id: "",
        titulo: "",
        id_tipo_produccion: "",
        id_carrera: "",
        id_area: "",
        id_linea: "",
        id_tipo_investigacion: "",
        id_categoria: "",
        anio: "",
        resumen: ""
    });
    const [archivoPDF, setArchivoPDF] = useState(null);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const [tiposProduccion, setTiposProduccion] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [areas, setAreas] = useState([]);
    const [lineas, setLineas] = useState([]);
    const [tiposInvestigacion, setTiposInvestigacion] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        async function cargarOpciones() {
            try {
                const [
                    tiposProduccionData,
                    carrerasData,
                    areasData,
                    lineasData,
                    tiposInvestigacionData,
                    categoriasData
                ] = await Promise.all([
                    tipoProduccionService.obtenerTodos(),
                    carreraService.obtenerTodos(),
                    areaService.obtenerTodos(),
                    lineaService.obtenerTodos(),
                    investigacionService.obtenerTodos(),
                    categoriasService.obtenerTodos()
                ]);

                setTiposProduccion(tiposProduccionData);
                setCarreras(carrerasData);
                setAreas(areasData);
                setLineas(lineasData);
                setTiposInvestigacion(tiposInvestigacionData);
                setCategorias(categoriasData);
            } catch (error) {
                setError("No se pudieron cargar las opciones del formulario");
            }
        }

        cargarOpciones();
    }, []);

    useEffect(() => {
        if (repos) {
            setFormData({
                id: repos.id || "",
                titulo: repos.titulo || "",
                id_tipo_produccion: repos.tipoProduccion?.id || "",
                id_carrera: repos.carrera?.id || "",
                id_area: repos.area?.id || "",
                id_linea: repos.linea?.id || "",
                id_tipo_investigacion: repos.tipoInvestigacion?.id || "",
                id_categoria: repos.categoria?.id || "",
                anio: repos.anio || "",
                resumen: repos.resumen || ""
            });
            setArchivoPDF(null); // no se reemplaza el PDF a menos que el usuario suba uno nuevo
        }
    }, [repos]);

    const cambios = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const guardar = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setCargando(true);
            await onGuardar({ ...formData, archivo: archivoPDF }); // archivo puede ser null: se conserva el anterior
        } catch (error) {
            setError(error.message || "No se pudo guardar la edición");
        } finally {
            setCargando(false);
        }
    };

    if (!show || !repos) return null;
    return (
        <>
            <Modal show={show} size="lg" onHide={onCerrar} centered>
                <ModalHeader closeButton>
                    <ModalTitle>Editar Repositorio</ModalTitle>
                </ModalHeader>
                <form onSubmit={guardar}>
                    <ModalBody>
                        {error && <div className="alert alert-danger">{error}</div>}

                        <div className="mb-3">
                            <label htmlFor="titulo" className="form-label">Título</label>
                            <input type="text" className="form-control"
                                id="titulo" name="titulo"
                                value={formData.titulo}
                                onChange={cambios}
                                placeholder="Ej: Análisis de seguridad en aplicaciones web"
                                required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="id_tipo_produccion" className="form-label">Tipo de producción</label>
                            <select className="form-control"
                                name="id_tipo_produccion" id="id_tipo_produccion"
                                value={formData.id_tipo_produccion}
                                onChange={cambios}
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
                                value={formData.id_carrera}
                                onChange={cambios}
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
                                value={formData.id_area}
                                onChange={cambios}
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
                                value={formData.id_linea}
                                onChange={cambios}
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
                                value={formData.id_tipo_investigacion}
                                onChange={cambios}
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
                                value={formData.id_categoria}
                                onChange={cambios}
                                required>
                                <option value="">-- Seleccionar --</option>
                                {categorias.map((c) => (
                                    <option key={c.id} value={c.id}>{c.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="anio" className="form-label">Año</label>
                            <input type="number" className="form-control"
                                id="anio" name="anio"
                                value={formData.anio}
                                onChange={cambios}
                                placeholder="Ej: 2026" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="resumen" className="form-label">Resumen</label>
                            <textarea name="resumen" id="resumen"
                                className="form-control"
                                value={formData.resumen}
                                onChange={cambios}
                                placeholder="Resumen del trabajo ...."></textarea>
                        </div>

                        <InputPDF onArchivoSubido={(file) => setArchivoPDF(file)} />
                        <small className="text-muted d-block mb-3">
                            Deja esto vacío si no quieres reemplazar el PDF actual.
                        </small>

                        <button type="submit" className="btn-enviar d-inline-flex align-items-center justify-content-center" disabled={cargando}>
                            <FaSave /> {cargando ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </ModalBody>
                </form>
            </Modal>

        </>
    )

}

export default Editar;