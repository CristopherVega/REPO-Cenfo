import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "react-bootstrap";

function Ver({ repos, show, onCerrar }) {
    if (!show || !repos) return null;

    const urlPDF = repos.contenido
        ? `http://localhost:3000/uploads/${repos.contenido}`
        : null;

    return (
        <Modal show={show} size="lg" onHide={onCerrar} centered>
            <ModalHeader closeButton>
                <ModalTitle>{repos.titulo || "Sin título"}</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <p><strong>Autor:</strong> {repos.autor?.nombre || "No especificado"}</p>
                <p><strong>Carrera:</strong> {repos.carrera?.nombre || "No especificada"}</p>
                <p><strong>Tipo:</strong> {repos.tipoProduccion?.nombre || "N/A"}</p>
                <p><strong>Área:</strong> {repos.area?.nombre || "N/A"}</p>
                <p><strong>Línea de Investigación:</strong> {repos.linea?.nombre || "N/A"}</p>
                <p><strong>Tipo de Investigación:</strong> {repos.tipoInvestigacion?.nombre || "N/A"}</p>
                <p><strong>Categoría:</strong> {repos.categoria?.nombre || "N/A"}</p>
                <p><strong>Año:</strong> {repos.anio || "N/A"}</p>
                <p><strong>Resumen:</strong> {repos.resumen || "Sin resumen disponible."}</p>
                <p>
                    <strong>Documento:</strong>{" "}
                    {urlPDF ? (
                        <a href={urlPDF} target="_blank" rel="noreferrer">Ver PDF</a>
                    ) : (
                        "Sin documento adjunto"
                    )}
                </p>
            </ModalBody>

            <ModalFooter>
                <button onClick={onCerrar} className="btn btn-secondary">
                    Cerrar
                </button>
            </ModalFooter>
        </Modal>
    );
}

export default Ver;