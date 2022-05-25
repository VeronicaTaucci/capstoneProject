import React, { useState, useEffect } from 'react'
import Cloudinary from './Cloudinary'
import Recorder from './Recorder'
import Comments from './Comment'
import DisplayMedia from './DisplayMedia'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Figure from 'react-bootstrap/Figure'
import Navbar from './layout/Navbar'
import "./styles/homePage.css"
const Home = () => {

  const [showText, setShowText] = useState(false);
const [triggerDisplay, setTriggerDisplay] = useState(false)

  useEffect(() => {
    document.title = "Home"
  }, [])

  const onClick = () => setShowText(!showText);

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
              
              <p className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ex accusantium in a possimus, mollitia aspernatur molestiae harum, doloribus omnis porro dolorem repudiandae saepe id corrupti aliquam maiores magnam. Voluptates!</p>
</div>
{/*             
            <img src='https://static.independent.co.uk/2021/07/09/11/newFile-6.jpg?quality=75&width=982&height=726&auto=webp'/><br/>
          The Animal Lady  */}
              <Cloudinary triggerDisplay={triggerDisplay} setTriggerDisplay={ setTriggerDisplay}/>
            <button onClick={onClick}>Record Audio Message</button>
            {showText ? <Record /> : null}<br/>
            <Comments />
          </div>
          </Col>
          
          <Col className='col' xs lg="8">
            <DisplayMedia triggerDisplay={triggerDisplay} setTriggerDisplay={setTriggerDisplay} />
          </Col>
          {/* <Col className='col' xs lg="2">
              ALBUMS:
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src="https://static.independent.co.uk/2021/07/09/11/newFile-6.jpg?quality=75&width=982&height=726&auto=webp"
              />
              <Figure.Caption>
               album name
              </Figure.Caption>
            </Figure>
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src="https://static.independent.co.uk/2021/07/09/11/newFile-6.jpg?quality=75&width=982&height=726&auto=webp"
              />
              <Figure.Caption>
                album name
              </Figure.Caption>
            </Figure>
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src="https://static.independent.co.uk/2021/07/09/11/newFile-6.jpg?quality=75&width=982&height=726&auto=webp"
              />
              <Figure.Caption>
                album name
              </Figure.Caption>
            </Figure>
            <ul>
              <li>vero</li>
              <li>violet</li>
              <li>chloe</li>
              <li>violet</li>
              <a href='/'>create new album</a>
            </ul>
            display/sort:
            <ul>
              <li>pictures</li>
              <li>recordings</li>
              <li>comments</li>
              
            </ul>
          </Col> */}
        </Row>
      </Container>
      
      
    </>
  )
}

const Record = () => <Recorder />;

export default Home