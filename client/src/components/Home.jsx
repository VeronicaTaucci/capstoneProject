import React, { useState, useEffect } from 'react'
import Cloudinary from './Cloudinary'
import Recorder from './Recorder'

const Home = () => {

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    document.title = "Home"
  }, [])

  const onClick = () => setShowText(!showText);

  return (
    <>
      <Cloudinary /><br/>
      <button onClick={onClick}>Record Audio Message</button>
      {showText ? <Record /> : null}
    </>
  )
}

const Record = () => <Recorder />;

export default Home