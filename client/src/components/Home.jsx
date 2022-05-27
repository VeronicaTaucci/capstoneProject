import React, { useState, useEffect } from 'react'
import Cloudinary from './Cloudinary'
import Recorder from './Recorder'
import Comments from './Comment'
import DisplayMedia from './DisplayMedia'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Figure from 'react-bootstrap/Figure'
import Navbar from './layout/Navbar'
import "./styles/homePage.css"
import CreateAlbum from './CreateAlbum'
import DisplayAlbums from './DisplayAlbums'
const Home = () => {

  const [showText, setShowText] = useState(false);
  const [triggerDisplay, setTriggerDisplay] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    document.title = "Home"
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar />
      <Container fluid={true} className='m-5'>
        <Row >
          <Col xs lg="4" className='col ' >
            <div className='mainCol'>
              <div className="card-box">
                <div className="card-thumbnail">
                  <img src="https://static.independent.co.uk/2021/07/09/11/newFile-6.jpg?quality=75&width=982&height=726&auto=webp" className="img-fluid" alt=""></img>
                </div>

                <p className="text-secondary" >you can change this text if you click on it</p>
              </div>
              <Cloudinary triggerDisplay={triggerDisplay} setTriggerDisplay={setTriggerDisplay} /><br /><br />
              <Button variant="primary" onClick={handleShow}>Record Audio Message</Button><br /><br />
              <Comments triggerDisplay={triggerDisplay} setTriggerDisplay={setTriggerDisplay} />
              {/* <CreateAlbum triggerDisplay={triggerDisplay} setTriggerDisplay={setTriggerDisplay}/> */}
              <DisplayAlbums triggerDisplay={triggerDisplay} setTriggerDisplay={setTriggerDisplay}/>
            </div>
          </Col>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Audio Recorder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Please select 'Record' to start recording a message.  Preview, delete, re-record message (if necessary) and when you are satisfied with the message, click 'Submit Audio'.
              <Recorder handleClose={handleClose} triggerDisplay={triggerDisplay} setTriggerDisplay={setTriggerDisplay}  />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Col className='col' xs lg="8">
            <DisplayMedia triggerDisplay={triggerDisplay} setTriggerDisplay={setTriggerDisplay} />
          </Col>
        </Row>
      </Container>


    </>
  )
}



export default Home