import React, { useState, useEffect } from 'react'
import Cloudinary from './Cloudinary'
import Recorder from './Recorder'
import Comments from './Comment'
import DisplayMedia from './DisplayMedia'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import Accordion from 'react-bootstrap/Accordion'
import CreateAlbum from './CreateAlbum'
import "./styles/homePage.css"

const Home = () => {

  const [triggerDisplay, setTriggerDisplay] = useState(false)

  useEffect(() => {
    document.title = "Home"
  }, [])

  return (
    <>
      <Navbar />
      <Container fluid={true} className='m-5'>
        <Row>
          <Col xs lg="4" className='col' >
            <div className='mainCol'>
              <div className="card-box">
                <div className="card-thumbnail">
                  <img src="https://res.cloudinary.com/dc-capstone2022/image/upload/v1652820884/cld-sample.jpg" className="img-fluid" alt=""></img>
                </div>
                {/* <p className="text-secondary" >you can change this text if you click on it</p> //! this was causing an error - cannot nest <p> inside of a <div> */}
              </div>
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
    <Footer/>

    </>
  )
}



export default Home