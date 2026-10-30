import { useState } from "react";
import { useRol } from "../../context/RolContext";
import { investigacionService } from "../../service/investigacion";
import Eliminar from "../modals/Eliminar";
import { FaTrash } from "react-icons/fa";

function TablaInvestigacion({ investigacion , onEliminado}) {

     const [errorEliminar, setErrorEliminar] = useState("");
    const [investigacionEliminar, setinvestigacionEliminar] = useState(null);
    


    if (!investigacion || investigacion.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron investigacion
            </div>
        )
    }

 const handleEliminar = async () => {
        if (!investigacionEliminar) return;

        try {
            setErrorEliminar("");
            await investigacionService.eliminar(investigacionEliminar.id);

            setinvestigacionEliminar(null);

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
                        {investigacion.map((user) => (
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
                                        onClick={() => setinvestigacionEliminar(user)}
                                        title="Eliminar"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {investigacionEliminar && (
                    <Eliminar
                        repos={investigacionEliminar}
                        show={Boolean(investigacionEliminar)}
                        onCerrar={() => setinvestigacionEliminar(null)}
                        onEliminar={handleEliminar} />
                )}
            </div>
        </>
    )
}

export default TablaInvestigacion;