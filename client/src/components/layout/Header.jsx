import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <ul>
        <li> <Link to='/'>Sign In</Link></li>
        <li> <Link to='/register'>Register</Link></li>
        <li> <Link to='/home'>Home</Link></li>
        <li> <Link to='/albums'>All Albums</Link></li>
        <li> <Link to='/album'>Album Title</Link></li>

    </ul>
  )
}

export default Header