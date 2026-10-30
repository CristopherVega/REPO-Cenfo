import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../service/authService";
import { useRol } from "../context/RolContext";

function Login() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const { iniciarSesion } = useRol();
    const navigate = useNavigate();

    async function manejarEnvio(e) {
        e.preventDefault();
        setError("");
        setCargando(true);

        try {
            const resultado = await authService.login(correo, contrasena);
            iniciarSesion(resultado); // { token, usuario }
            navigate("/");
        } catch (error) {
            setError(error.message || "No se pudo iniciar sesión");
        } finally {
            setCargando(false);
        }
    }

    return (
        <section className="container mt-5 d-flex justify-content-center">
            <div className="form-container" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Iniciar Sesión</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={manejarEnvio}>
                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label">Correo</label>
                        <input
                            type="email"
                            className="form-control"
                            id="correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder="usuario@ucenfotec.ac.cr"
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
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={cargando}>
                        {cargando ? "Ingresando..." : "Ingresar"}
                    </button>
                </form>

                <p className="text-center mt-3">
                    ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
                </p>
            </div>
        </section>
    );
}

export default Login;