import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <ul>
      <li> <Link to='/signout'>Sign Out</Link></li>
      <li> <Link to='/signin'>Sign In</Link></li>
      <li> <Link to='/signup'>Register</Link></li>
        <li> <Link to='/home'>Home</Link></li>
        <li> <Link to='/albums'>All Albums</Link></li>
        <li> <Link to='/album'>Album Title</Link></li>
        <li> <Link to='/comment'>Comment</Link></li>
    </ul>
  )
}

export default Header