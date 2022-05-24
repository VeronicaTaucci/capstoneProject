import React, { useState, useEffect } from 'react'
import Cloudinary from './Cloudinary'
import Recorder from './Recorder'
import Comments from './Comment'
import DisplayMedia from './DisplayMedia'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Home = () => {

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    document.title = "Home"
  }, [])

  const onClick = () => setShowText(!showText);

  return (
    <>
        <Container>
        <Row>
          <Col xs lg="2" className='justify-content-center'>
            <img src='../../profileplaceholder.jpeg'/><br/>
            The Animal Lady
          </Col>
          <Col xs lg="2">
            <Cloudinary/><br/>
            <button onClick={onClick}>Record Audio Message</button>
            {showText ? <Record /> : null}<br/>
            <Comments/></Col>
          <Col xs lg="6"><DisplayMedia/></Col>
        </Row>
        </Container>
    </>
  )
}

const Record = () => <Recorder />;

export default Home