import { ModalHeader, ModalBody,Modal,ModalFooter, ModalTitle } from "react-bootstrap";
function Eliminar({repos, onEliminar, onCerrar, show, mensaje}){

    if (!show || !repos) return null;
    return(
        <>
        <Modal show={show} size="md" onHide={onCerrar} centered>
            <ModalHeader className="bg-danger" closeButton>
                <ModalTitle >Confirmar eliminacion</ModalTitle>
        </ModalHeader>
        <ModalBody>
            <h4><strong>¿Deseas eliminar este registro?</strong></h4>
            <p className="text-muted">{mensaje || repos.titulo || repos.nombre || "Registro seleccionado"}</p>
        </ModalBody>
        <ModalFooter>
            <button onClick={onCerrar} className="btn btn-secondary">Cancelar</button>
            <button onClick={onEliminar} className="btn btn-danger">Eliminar</button>
        </ModalFooter>

        </Modal>
        
        
        </>
     
    )
}

export default Eliminar;