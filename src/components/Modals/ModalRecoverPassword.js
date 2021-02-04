import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'


function ModalRecoverPassword({handleClose, show}) {

    return (
        <Modal
        show={show} 
        onHide={handleClose} 
        backdrop="static" 
        keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Success!</Modal.Title>
            </Modal.Header>
            <Modal.Body>The instructions were sent successfully! Check your email and follow the instructions please.</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    <Link className="text-white" to="/" >Return</Link>
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalRecoverPassword