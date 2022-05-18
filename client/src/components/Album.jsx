import React, {useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'


const Album = () => {

  const {albumID} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${albumID}`
  }, [])

  const handleClick = () => {
    navigate('/albums')
  }

  return (
  <>
    <h2>{albumID}</h2>
    <button onClick={handleClick}>Back to All Albums</button>
  </>
  )
}

export default Album