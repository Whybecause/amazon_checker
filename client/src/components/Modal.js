import React from 'react';
import { Modal, Button } from "react-bootstrap";

const ModalComponent = ({showModal, modalHeader, modalBody, handleCloseModal, onClickFunction}) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={onClickFunction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ModalComponent;