import { useState } from "react";
import { carreraService } from "../../service/carreraService";
import Eliminar from "../modals/Eliminar";
import { FaTrash } from "react-icons/fa";

function TablaCarrera({ carreras, onEliminado }) {
    const [carreraEliminar, setCarreraEliminar] = useState(null);
    const [errorEliminar, setErrorEliminar]=useState("");

    if (!carreras || carreras.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron carreras
            </div>
        );
    }

    const handleEliminar = async () => {
        if (!carreraEliminar) return;
        try {
            setErrorEliminar("");
            await carreraService.eliminar(carreraEliminar.id);

            setCarreraEliminar(null);

            if(onEliminado){
                await onEliminado();
            }
        } catch (error) {
            setErrorEliminar("Ocurrio un error al eliminar la carrera");
        }
    };

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
                        {carreras.map((carrera) => (
                            <tr key={carrera.id}>
                                <td>
                                    <small>{carrera.id}</small>
                                </td>
                                <td>{carrera.nombre}</td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center p-2"
                                        onClick={() => setCarreraEliminar(carrera)}
                                        title="Eliminar"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {carreraEliminar && (
                    <Eliminar
                        repos={carreraEliminar}
                        show={Boolean(carreraEliminar)}
                        onCerrar={() => setCarreraEliminar(null)}
                        onEliminar={handleEliminar}
                    />
                )}
            </div>
        </>
    );
}

export default TablaCarrera;