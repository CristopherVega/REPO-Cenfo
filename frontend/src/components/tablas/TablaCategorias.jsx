import { useState } from "react";
import { categoriasService } from "../../service/categoriasService";
import Eliminar from "../modals/Eliminar";
import { FaTrash } from "react-icons/fa";


function TablaCategorias({ categorias, onEliminado }) {

    const [categoriaEliminar, setCategoriaEliminar] = useState(null);
    const [errorEliminar, setErrorEliminar] = useState("");


    if (!categorias || categorias.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4" role="alert">
                No se encontraron categorias
            </div>
        )
    }


    const handleEliminar = async () => {
        if (!categoriaEliminar) return;

        try {
            setErrorEliminar("");
            await categoriasService.eliminar(categoriaEliminar.id);

            setCategoriaEliminar(null);

            if (onEliminado) {
                await onEliminado();
            }
        } catch (error) {
            setErrorEliminar("Ocurrio un error al eliminar la categoria");
        }
    }

    return (

        <>
            {errorEliminar && <div className="alert alert-danger mt-3">{errorEliminar}</div>}

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
                        {categorias.map((user) => (
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
                                        onClick={() => setCategoriaEliminar(user)}
                                        title="Eliminar"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {categoriaEliminar && (
                    <Eliminar
                        repos={categoriaEliminar}
                        show={Boolean(categoriaEliminar)}
                        onCerrar={() => setCategoriaEliminar(null)}
                        onEliminar={handleEliminar} />
                )}
            </div>
        </>
    )

}

export default TablaCategorias;