import { useState } from "react";
import { FaSave } from "react-icons/fa";

const estadoInicial = {
    nombre: "",
    descripcion: ""
}


function FormProduccion({ onGuardar }) {
    const [formulario, setFormulario] = useState(estadoInicial);
    const [error, setError] = useState("");

    function manejarCambio(e) {
        const nombre = e.target.name;
        const valor = e.target.value;

        setFormulario((anterior) => ({
            ...anterior,
            [nombre]: valor
        }));
    }

    async function manejarEnvio(e) {
        e.preventDefault();
        try {
            setError("");
            await onGuardar(formulario);
            setFormulario(estadoInicial);
        } catch (erroCapturado) {
            setError(erroCapturado.message || "Error al procesar la solicitud");
        }
    }

    return (
        <section className="container mt-5 d-flex justify-content-center">
            <div className="form-container">
                {error && <div className="alert alert-danger">{error}</div>}

                <form id="form-registro" onSubmit={manejarEnvio}>

                        <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input 
                            type="text" 
                            className="form-control"
                            id="nombre" 
                            name="nombre"
                            value={formulario.nombre}
                            onChange={manejarCambio}
                            placeholder="Ej: Tesis" 
                            required 
                        />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">descripcion</label>
                        <input
                            type="text"
                            className="form-control"
                            id="descripcion"
                            name="descripcion"
                            value={formulario.descripcion}
                            onChange={manejarCambio}
                            placeholder="......"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary d-inline-flex align-items-center justify-content-center gap-2">
                        <FaSave /> Registrar
                    </button>
                </form>
            </div>
        </section>
    )
}

export default FormProduccion;