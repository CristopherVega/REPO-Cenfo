import { useState } from "react";
import { lineaService } from "../../service/lineaService";
import Eliminar from "../modals/Eliminar";
import { FaTrash } from "react-icons/fa";

function TablaLinea({ investigaciones, onEliminado }) {
    const [investigacionEliminar, setInvestigacionEliminar] = useState(null);
    const [errorEliminar, setErrorEliminar] = useState("");


    if (!investigaciones || investigaciones.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron líneas de investigación
            </div>
        );
    }

     const handleEliminar = async () => {
         if (!investigacionEliminar) return;
 
         try {
             setErrorEliminar("");
             await lineaService.eliminar(investigacionEliminar.id);
 
             setInvestigacionEliminar(null);
 
             if (onEliminado) {
                 await onEliminado();
             }
         } catch (error) {
             setErrorEliminar("Ocurrio un error al eliminar la linea");
         }
     }

    return (
        <>
            <div className="table-responsive mt-4">
                <table className="table table-hover align-middle border mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investigaciones.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <small>{item.id}</small>
                                </td>
                                <td>{item.nombre}</td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center p-2"
                                        onClick={() => setInvestigacionEliminar(item)}
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
                        onCerrar={() => setInvestigacionEliminar(null)}
                        onEliminar={handleEliminar} 
                    />
                )}
            </div>
        </>
    );
}

export default TablaLinea;