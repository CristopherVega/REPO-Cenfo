import { useState } from "react";
import { FaSave } from "react-icons/fa";

const estadoInicial = {
    nombre: "",
    rol: "",
    estado: "",
};

function FormUsuario({ onGuardar }) {
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
            
            const nombreFormateado = formulario.nombre
                .toLowerCase()
                .trim()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
                .replace(/\s+/g, ".");  

            const usuarioConEmail = {
                ...formulario,
                email: `${nombreFormateado}@cenfotec.ac.cr`
            };

            await onGuardar(usuarioConEmail);
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
                            placeholder="Ej: Juan Perez" 
                            required 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="rol" className="form-label">Rol</label>
                        <select 
                            className="form-select"
                            name="rol" 
                            id="rol"
                            value={formulario.rol}
                            onChange={manejarCambio}
                            required
                        >
                            <option value="">-- Seleccionar --</option>
                            <option value="administrador">Administrador</option>
                            <option value="estudiante">Estudiante</option>
                            <option value="docente">Docente</option>
                            <option value="coordinador">Coordinador</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="estado" className="form-label">Estado</label>
                        <select 
                            className="form-select"
                            name="estado" 
                            id="estado"
                            value={formulario.estado}
                            onChange={manejarCambio}
                            required
                        >
                            <option value="">-- Seleccionar --</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary d-inline-flex align-items-center justify-content-center gap-2">
                        <FaSave /> Registrar
                    </button>
                </form>
            </div>
        </section>
    );
}

export default FormUsuario;
