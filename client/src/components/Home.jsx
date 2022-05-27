import React, { useState, useEffect } from 'react'
import Cloudinary from './Cloudinary'
import Recorder from './Recorder'
import Comments from './Comment'
import DisplayMedia from './DisplayMedia'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from './layout/Navbar'
import Accordion from 'react-bootstrap/Accordion'
import CreateAlbum from './CreateAlbum'
import "./styles/homePage.css"
import DisplayAlbums from './DisplayAlbums'

const Home = () => {

  const [triggerDisplay, setTriggerDisplay] = useState(false)

  useEffect(() => {
    document.title = "Home"
  }, [])

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
              <Accordion defaultActiveKey="0">
                <Recorder triggerDisplay={triggerDisplay} setTriggerDisplay={setTriggerDisplay} />
                <Cloudinary triggerDisplay={triggerDisplay} setTriggerDisplay={setTriggerDisplay} />
                <Comments triggerDisplay={triggerDisplay} setTriggerDisplay={setTriggerDisplay} />
                <CreateAlbum />
              </Accordion>
          </Col>
          <Col className='col' xs lg="8">
            <DisplayMedia triggerDisplay={triggerDisplay} setTriggerDisplay={setTriggerDisplay} />
          </Col>
        </Row>
      </Container>


    </>
  )
}



export default Home