import React from 'react';
import SignIn from "./components/auth/Signin";
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  return (
    <>
    <ChakraProvider>
      <SignIn/>
    </ChakraProvider>
    </>
  )
}

export default App;
