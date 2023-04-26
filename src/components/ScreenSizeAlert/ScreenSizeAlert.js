import React, { useState, useEffect } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import { Modal, Button } from 'react-bootstrap'
import { BsEnvelopeFill } from 'react-icons/bs'

// import styles from './ScreenSizeAlert.module.scss'

function ScreenSizeAlert() {
  const size = useWindowSize()
  const [showModal, setShowModal] = useState(size.width < 992)
  const [modalWasClosed, setModalWasClosed] = useState(false)

  const handleClose = () => {
    setShowModal(false)
    setModalWasClosed(true)
  }

  useEffect(() => {
    if (modalWasClosed === false) {
      setShowModal(size.width < 992)
    }
  }, [modalWasClosed, size])

  return (
    <Modal
      className="raw-modal"
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title as="h5">
          <span role="img" aria-label="Party icon">
            🎉
          </span>{' '}
          Welcome to Sportanalyse-Anwendung 1.0.0!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="big">
          Sportanalyse-Anwendung 1.0.0 is designed for {size.width >= 768 ? 'slightly ' : ' '}
          bigger screens!
        </p>
        <p>
          Please resize your window so that the application can be properly used!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Got it!
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ScreenSizeAlert
