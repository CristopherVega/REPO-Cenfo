import { useState } from "react";
import { useRol } from "../../context/RolContext";
import { areaService } from "../../service/areaService";
import Eliminar from "../modals/Eliminar";
import { FaTrash } from "react-icons/fa";


function TablaAreas({ areas , onEliminado}) {

    const [selectedAreas, setAreas] = useState(null);
    const [areaEliminar, setAreaEliminar] = useState(null);
    const [errorEliminar, setErrorEliminar] = useState("");
    const { rol } = useRol();


    if (!areas || areas.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron areas
            </div>
        )
    }

 const handleEliminar = async () => {
        if (!areaEliminar) return;

        try {
            setErrorEliminar("");
            await areaService.eliminar(areaEliminar.id);

            setAreaEliminar(null);

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
                        {areas.map((user) => (
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
                                        onClick={() => setAreaEliminar(user)}
                                        title="Eliminar"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {areaEliminar && (
                    <Eliminar
                        repos={areaEliminar}
                        show={Boolean(areaEliminar)}
                        onCerrar={() => setAreaEliminar(null)}
                        onEliminar={handleEliminar} />
                )}
            </div>
        </>
    )
}

export default TablaAreas;