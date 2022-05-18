import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <ul>
      <li> <Link to='/signout'>Sign Out</Link></li>
      <li> <Link to='/signin'>Sign In</Link></li>
      <li> <Link to='/signup'>Register</Link></li>
        <li> <Link to='/home'>Home</Link></li>
        <li> <Link to='/albums'>Albums</Link></li>

    </ul>
  )
}

export default Header