import { useState } from "react";
import { useRol } from "../../context/RolContext";
import Eliminar from "../modals/Eliminar";
import { FaTrash } from "react-icons/fa";
import { tipoProduccionService } from "../../service/tipoProduccionService";


function TablaTipoProduccion({ tipoProduccion, onEliminado }) {
    const [selectProduccion, setProduccion] = useState(null);
    const [produccionEliminar , setproduccionEliminar] = useState(null);
    const [errorEliminar, setErrorEliminar] = useState("");
    const { rol } = useRol();


    if (!tipoProduccion || tipoProduccion.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron tipoProduccion
            </div>
        )
    }

  const handleEliminar = async () => {
        if (!produccionEliminar) return;

        try {
            setErrorEliminar("");
            await tipoProduccionService.eliminar(produccionEliminar.id);

            setproduccionEliminar(null);

            if (onEliminado) {
                await onEliminado();
            }
        } catch (error) {
            setErrorEliminar(error.message || "Ocurrió un error al eliminar el tipo de producción");
        }
    }

    return (
        <>
            <div className="table-responsive mt-4">
                {errorEliminar && <div className="alert alert-danger">{errorEliminar}</div>}
                <table className="table table-hover align-middle border mb-0">
                    <thead className="">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th className="text-center">Accciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tipoProduccion.map((produccion) => (
                            <tr key={produccion.id} >
                                <td>
                                    <small>{produccion.id}</small>
                                </td>
                                <td>
                                    {produccion.nombre}
                                </td>
                                <td>
                                    {produccion.descripcion}
                                </td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center p-2"
                                        onClick={() => setproduccionEliminar
                                            (produccion)}
                                        title="Eliminar"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {produccionEliminar
                    && (
                        <Eliminar
                            repos={produccionEliminar

                            }
                            show={Boolean(produccionEliminar

                            )}
                            onCerrar={() => setproduccionEliminar
                                (null)}
                            onEliminar={handleEliminar} />
                    )}
            </div>
        </>
    )
}


export default TablaTipoProduccion;
