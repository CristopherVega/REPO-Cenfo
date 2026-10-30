import { useState } from "react";
import { usuarioService } from "../../service/usuarioService";
import Eliminar from "../modals/Eliminar";
import { FaTrash, FaSave } from "react-icons/fa";

const ROLES = ["estudiante", "docente", "coordinador", "administrador"];
const ESTADOS = ["activo", "inactivo"];

function TablaUsuarios({ usuarios, onCambio }) {
    const [usuarioEliminar, setUsuarioEliminar] = useState(null);
    const [errorAccion, setErrorAccion] = useState("");
    const [cambiosPendientes, setCambiosPendientes] = useState({}); 
    const [guardandoId, setGuardandoId] = useState(null);

    if (!usuarios || usuarios.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron usuarios
            </div>
        )
    }

    function valorActual(user, campo) {
        return (cambiosPendientes[user.id] && cambiosPendientes[user.id][campo]) ?? user[campo];
    }

    function manejarCambioCampo(userID, campo, valor) {
        setCambiosPendientes((anterior) => ({
            ...anterior,
            [userID]: { ...anterior[userID], [campo]: valor }
        }));
    }

    async function guardarCambios(user) {
        const cambios = cambiosPendientes[user.id];
        if (!cambios) return;

        try {
            setErrorAccion("");
            setGuardandoId(user.id);
            await usuarioService.actualizar(user.id, cambios);

            setCambiosPendientes((anterior) => {
                const copia = { ...anterior };
                delete copia[user.id];
                return copia;
            });

            if (onCambio) {
                await onCambio();
            }
        } catch (error) {
            setErrorAccion(error.message || "No se pudo actualizar el usuario");
        } finally {
            setGuardandoId(null);
        }
    }

    const handleEliminar = async () => {
        if (!usuarioEliminar) return;

        try {
            setErrorAccion("");
            await usuarioService.eliminar(usuarioEliminar.id);
            setUsuarioEliminar(null);

            if (onCambio) {
                await onCambio();
            }
        } catch (error) {
            setErrorAccion("Ocurrio un error al eliminar el usuario");
        }
    }


    return (
        <>
            {errorAccion && <div className="alert alert-danger mt-3">{errorAccion}</div>}

            <div className="table-responsive mt-4">
                <table className="table table-hover align-middle border mb-0">
                    <thead className="">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th className="text-center">Accciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((user) => {
                            const tieneCambios = Boolean(cambiosPendientes[user.id]);

                            return (
                                <tr key={user.id} >
                                    <td>
                                        <small>{user.id}</small>
                                    </td>
                                    <td>
                                        {user.nombre}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        <select
                                            className="form-select form-select-sm"
                                            value={valorActual(user, "rol")}
                                            onChange={(e) => manejarCambioCampo(user.id, "rol", e.target.value)}
                                        >
                                            {ROLES.map((r) => (
                                                <option key={r} value={r}>{r}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            className="form-select form-select-sm"
                                            value={valorActual(user, "estado")}
                                            onChange={(e) => manejarCambioCampo(user.id, "estado", e.target.value)}
                                        >
                                            {ESTADOS.map((e) => (
                                                <option key={e} value={e}>{e}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-inline-flex gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-success btn-sm d-inline-flex align-items-center justify-content-center p-2"
                                                onClick={() => guardarCambios(user)}
                                                disabled={!tieneCambios || guardandoId === user.id}
                                                title="Guardar cambios"
                                            >
                                                <FaSave />
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center p-2"
                                                onClick={() => setUsuarioEliminar(user)}
                                                title="Eliminar"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {usuarioEliminar && (
                    <Eliminar
                        repos={usuarioEliminar}
                        show={Boolean(usuarioEliminar)}
                        onCerrar={() => setUsuarioEliminar(null)}
                        onEliminar={handleEliminar} />
                )}
            </div>
        </>
    )
}

export default TablaUsuarios;
