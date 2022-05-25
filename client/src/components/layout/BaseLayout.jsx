import React from 'react'
import Header from './Header'

const BaseLayout = (props) => {
  return (
    <>
        <Header />

        {props.children}

        Footer Information

    </>
  )
}

export default BaseLayout