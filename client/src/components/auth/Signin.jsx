import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signIn } from '../../actions'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import "../styles/signInPage.css"
import FooterSignIn from "../layout/FooterSignIn";
import actionTypes from "../../actions/actionTypes";
import axios from 'axios'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
const Signin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate()
const [error, setError] = useState('')
  const handleSubmit = async (e) => {

    e.preventDefault();
    let formData = {
      email: email,
      password: password,
    }
    try {
      //make an api call to /login
      let response = await axios.post('/login', formData)
      console.log("logging in", response.data.token);
      if (response.data) {
        dispatch({
          type: actionTypes.AUTH_USER,
          data: response.data.token
        })
        //invoke the callback function to navigate to a feature page
        setError('')
        navigate('/')
        localStorage.setItem('token', response.data.token.JWT)
      } else {
        console.log("Email and/or password is incorrect")
      }
    } catch (error) {

      setError("Email and/or password is incorrect")
      console.log(error)
      dispatch({
        type: actionTypes.ERROR,
        data: error
      })
    }
  }

  return (
    <>
      <Alert status='error'>
        
        <AlertTitle>{error}</AlertTitle>
      </Alert>
      <Form className="signInForm"
        onSubmit={handleSubmit}>
        <img src="../../Logo.png" className="logo" />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control className="form-control" type="email" value={email}
            onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password}
            onChange={e => setPassword(e.target.value)} placeholder="Password" />
        </Form.Group>
        <Button variant="outline-primary" size="lg" type="submit" value="Log In" >
          Sign in
        </Button>
        <br /><br />Don't have an account? <Link to="/signup">Register Here</Link>
      </Form>
      <FooterSignIn />
    </>);
};
export default Signin