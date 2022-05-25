import React, { useState, useEffect } from 'react'
import Cloudinary from './Cloudinary'
import Recorder from './Recorder'
import Comments from './Comment'
import DisplayMedia from './DisplayMedia'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from './layout/Navbar'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const Home = () => {

  // const [showText, setShowText] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.title = "Home"
  }, [])

  // const onClick = () => setShowText(!showText);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar />
        <Container className='mt-5'>
        <Row>
          <Col xs lg="4" className='justify-content-center'>
            <img src='../../profileplaceholder.jpeg'/><br/>
            <h5>The Animal Lady</h5>
            <Cloudinary/><br/><br/>
            <Button variant="primary" onClick={handleShow}>Record Audio Message</Button><br/><br/>
            {/* <button onClick={onClick}>Record Audio Message</button> */}
            {/* {showText ? <Record /> : null}<br/> */}
            <Comments/></Col>
          <Col xs lg="8"><DisplayMedia/></Col>
        </Row>
        </Container>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Audio Recorder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please select 'Record' to start recording a message.  Preview, delete, re-record message (if necessary) and when you are satisfied with the message, click 'Submit Audio'.
          <Record handleClose={handleClose}/></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const Record = () => <Recorder />;

export default Home