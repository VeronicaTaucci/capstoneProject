import React from 'react'
import Signin from '../auth/Signin'
import Footer from './Footer'
import Header from './Header'
import NavbarComponent from './Navbar'

const BaseLayout = (props) => {
  return (
    <>
      
      {/* <Signin/> */}
      {/* <NavbarComponent />
        <Header />
      <Footer/> */}
       {props.children}
    </>
  )
}

export default BaseLayout