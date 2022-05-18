import React, {useEffect} from 'react'

const Albums = () => {

  useEffect(() => {
    document.title = "All Albums"
  }, [])

  return (
    <h2>All Albums</h2>
  )
}

export default Albums