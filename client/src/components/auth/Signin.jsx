import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signIn } from '../../actions'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import "../styles/signInPage.css"
const Signin = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (e) => {

    e.preventDefault();
    dispatch(signIn({ email, password }, () => {
      navigate('/home')
    }))
  }

  return (
    <>
      <img class="fit-picture" src="../../public/logo.png"/>
      <Form className="signInForm"
        onSubmit={handleSubmit}>
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
      <br/><br/>Don't have an account? <Link to="/signup">Register Here</Link>
      </Form>
    </>);
};
export default Signin