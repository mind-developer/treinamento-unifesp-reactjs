import React from 'react'
import {Modal, Button} from 'react-bootstrap'

export default function ModalCustom(props) {
  const { show, handleClose, modalHead, modalBody } = props
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {modalHead}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalBody}
      </Modal.Body>
    </Modal>

  )
}
