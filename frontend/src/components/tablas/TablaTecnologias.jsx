import { useState } from "react";
import { useRol } from "../../context/RolContext";
import { tecnologiasService } from "../../service/tecnologiasService";
import Eliminar from "../modals/Eliminar";
import { FaTrash } from "react-icons/fa";

function TablaTecnologias({ tecnologias, onEliminado }) {
    const [errorEliminar, setErrorEliminar] = useState("");
    const [tecnologiaEliminar, setTecnologiasEliminar] = useState(null);
    



    if (!tecnologias || tecnologias.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron tecnologias
            </div>
        )
    }

    const handleEliminar = async () => {
        if (!tecnologiaEliminar) return;

        try {
            setErrorEliminar("");
            await tecnologiasService.eliminar(tecnologiaEliminar.id);

            setTecnologiasEliminar(null);

            if (onEliminado) {
                await onEliminado();
            }
        } catch (error) {
            setErrorEliminar("Ocurrio un error al eliminar el area");
        }
    }

    return (
        <>
            <div className="table-responsive mt-4">
                <table className="table table-hover align-middle border mb-0">
                    <thead className="">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th className="text-center">Accciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tecnologias.map((user) => (
                            <tr key={user.id} >
                                <td>
                                    <small>{user.id}</small>
                                </td>
                                <td>
                                    {user.nombre}
                                </td>

                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center p-2"
                                        onClick={() => setTecnologiasEliminar(user)}
                                        title="Eliminar"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {tecnologiaEliminar && (
                    <Eliminar
                        repos={tecnologiaEliminar}
                        show={Boolean(tecnologiaEliminar)}
                        onCerrar={() => setTecnologiasEliminar(null)}
                        onEliminar={handleEliminar} />
                )}
            </div>
        </>
    )
}

export default TablaTecnologias;