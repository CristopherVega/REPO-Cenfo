import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormRegistro from "../components/forms/FormRegistro";
import { produccionService } from "../service/produccionService";

function RegistroRepo() {
    const [errorSubmit, setErrorSubmit] = useState("");
    const navigate = useNavigate();

    const handleGuardar = async (datosNuevoRepo) => {
        setErrorSubmit("");

        try {
            await produccionService.crear(datosNuevoRepo);
            navigate("/ListaRepos");
        } catch (error) {
            setErrorSubmit(error.message || "Error al guardar el registro");
        }
    }

    return (
        <>
            {errorSubmit && (
                <div className="container mt-4 d-flex justify-content-center">
                    <div className="alert alert-danger" style={{ maxWidth: "600px", width: "100%" }}>
                        {errorSubmit}
                    </div>
                </div>
            )}
            <FormRegistro onGuardar={handleGuardar} />
        </>
    )

}
export default RegistroRepo;