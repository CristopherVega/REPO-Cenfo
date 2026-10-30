import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../service/authService";

function Registro() {
    const [nombre, setNombre] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);
    const [usuarioCreado, setUsuarioCreado] = useState(null);

    async function manejarEnvio(e) {
        e.preventDefault();
        setError("");
        setCargando(true);

        try {
            const usuario = await authService.registrar(nombre, contrasena);
            setUsuarioCreado(usuario);
        } catch (error) {
            setError(error.message || "No se pudo completar el registro");
        } finally {
            setCargando(false);
        }
    }

    if (usuarioCreado) {
        return (
            <section className="container mt-5 d-flex justify-content-center">
                <div className="form-container text-center" style={{ maxWidth: "450px", width: "100%" }}>
                    <h2 className="mb-3">¡Cuenta creada!</h2>
                    <p>Guarda este correo, lo necesitas para iniciar sesión:</p>
                    <div className="alert alert-success fs-5">
                        {usuarioCreado.correo}
                    </div>
                    <Link to="/login" className="btn btn-primary mt-2">Ir a Iniciar Sesión</Link>
                </div>
            </section>
        );
    }

    return (
        <section className="container mt-5 d-flex justify-content-center">
            <div className="form-container" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Crear Cuenta</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={manejarEnvio}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre completo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ej: Cristopher Gutierrez"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="contrasena" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="contrasena"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            minLength={6}
                            required
                        />
                        <div className="form-text">Mínimo 6 caracteres.</div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={cargando}>
                        {cargando ? "Creando cuenta..." : "Registrarme"}
                    </button>
                </form>

                <p className="text-center mt-3">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
        </section>
    );
}

export default Registro;