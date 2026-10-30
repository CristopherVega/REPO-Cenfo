import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useRol } from "../../context/RolContext";
import { produccionService } from "../../service/produccionService";
import Eliminar from "../modals/Eliminar";
import Ver from "../modals/Ver";
import Editar from "../modals/Editar";

function TablaRepos({ repos, onCambio }) {

    const [selectedRepos, setSelectedRepos] = useState(null);
    const [repoEliminar, setRepoEliminar] = useState(null);
    const [repoEditar, setRepoEditar] = useState(null);
    const [error, setError] = useState("");

    const { rol, usuario } = useRol();
    // Mensaje por si el arreglo filtrado viene vacío
    if (!repos || repos.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron registros para mostrar.
            </div>
        );
    }

    const handelEditar = async (datosEditados) => {
        if (!repoEditar) return;
        try {
            setError("");
            await produccionService.actualizar(repoEditar.id, datosEditados);

            setRepoEditar(null);

            if (onCambio) {
                await onCambio();
            }
        } catch (error) {
            setError("Ocurrió un error editando el registro");
        }
    }

    const handleEliminar = async () => {
        if (!repoEliminar) return;
        try {
            setError("");
            await produccionService.eliminar(repoEliminar.id);

            setRepoEliminar(null);

            if (onCambio) {
                await onCambio();
            }
        } catch (error) {
            setError("Ocurrió un error al intentar eliminar el registro.");
        }
    }

    return (
        <div className="table-responsive mt-4">
            {error && <div className="alert alert-danger">{error}</div>}

            <table className="table table-hover align-middle border mb-0">
                <thead className="table-light">
                    <tr>
                        <th>Título</th>
                        <th>Tipo</th>
                        <th>Autor</th>
                        <th>Carrera</th>
                        <th>Área</th>
                        <th>Año</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {repos.map((registro) => (
                        <tr key={registro.id}>

                            <td className="text-truncate">
                                <Link to={"/ListaRepos"} className="text-decoration-none fw-medium">
                                    {registro.titulo.length > 30
                                        ? `${registro.titulo.substring(0, 30)}...`
                                        : registro.titulo}
                                </Link>
                            </td>

                            {/* Tipo */}
                            <td>
                                <span className="badge bg-primary">{registro.tipoProduccion?.nombre}</span>
                            </td>


                            <td>{registro.autor?.nombre}</td>


                            <td>
                                <small className="text-muted">{registro.carrera?.nombre}</small>
                            </td>


                            <td>
                                <small className="text-muted">{registro.area?.nombre}</small>
                            </td>


                            <td>{registro.anio}</td>


                            <td>
                                <div
                                    className="btn-group btn-group-sm d-flex gap-2 justify-content-center"
                                    role="group"
                                >
                                    <button
                                        className="btn btn-info text-white d-inline-flex align-items-center justify-content-center"
                                        onClick={() => setSelectedRepos(registro)}
                                        title="Ver"
                                    >
                                        <FaEye />
                                    </button>

                                    {(['administrador', 'coordinador'].includes(rol) || registro.autor?.id === usuario?.id) && (
                                        <button
                                            className="btn btn-warning text-white d-inline-flex align-items-center justify-content-center"
                                            onClick={() => setRepoEditar(registro)}
                                            title="Editar"
                                        >
                                            <FaEdit />
                                        </button>
                                    )}
                                    {(['administrador', 'coordinador'].includes(rol)) && (
                                        <button
                                            className="btn btn-danger d-inline-flex align-items-center justify-content-center"
                                            onClick={() => setRepoEliminar(registro)}
                                            title="Eliminar"
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedRepos && (
                <Ver
                    repos={selectedRepos}
                    show={Boolean(selectedRepos)}
                    onCerrar={() => setSelectedRepos(null)}
                />
            )}


            {repoEliminar && (
                <Eliminar
                    repos={repoEliminar}
                    show={Boolean(repoEliminar)}
                    onCerrar={() => setRepoEliminar(null)}
                    onEliminar={handleEliminar}
                />
            )}

            {repoEditar && (
                <Editar repos={repoEditar}
                    show={Boolean(repoEditar)}
                    onCerrar={() => setRepoEditar(null)}
                    onGuardar={handelEditar}
                />
            )}
        </div>
    );
}

export default TablaRepos;
