import { useState, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

function InputPDF({ onArchivoSubido }) {
    const [archivo, setArchivo] = useState(null);
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    const procesarArchivo = (file) => {
        if (file) {
            if (file.type !== "application/pdf") {
                setError("Solo se permiten archivos PDF.");
                setArchivo(null);
                onArchivoSubido(null);
                return;
            }
            setError("");
            setArchivo(file);
            onArchivoSubido(file);
        }
    };

    const manejarCambio = (e) => procesarArchivo(e.target.files[0]);
    const manejarDrop = (e) => {
        e.preventDefault();
        procesarArchivo(e.dataTransfer.files[0]);
    };
    return (
        <div className="mb-3">
            <label htmlFor="pdf" className="form-label">Documento PDF</label>

            <div className="file-upload-area" onClick={() => inputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={manejarDrop}>
                <FaCloudUploadAlt style={{ fontSize: "2rem", color: "#6f42c1" }} />
                <p className="mt-2 mb-0">Arrastra tu PDF aquí o haz clic para seleccionar</p>

                <input
                    type="file"
                    ref={inputRef}
                    accept=".pdf"
                    style={{ display: "none" }}
                    onChange={manejarCambio}
                />

                {archivo && (
                    <div className="file-name text-success mt-2 fw-bold">
                        📄 {archivo.name}
                    </div>
                )}
            </div>

            {error && <small className="text-danger">{error}</small>}
        </div>
    )
}

export default InputPDF;