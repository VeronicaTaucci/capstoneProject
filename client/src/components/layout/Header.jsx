import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <ul>
        <li> <Link to='/'>Sign In</Link></li>
        <li> <Link to='/register'>Register</Link></li>
        <li> <Link to='/home'>Home</Link></li>
        <li> <Link to='/albums'>Albums</Link></li>

    </ul>
  )
}

export default Header