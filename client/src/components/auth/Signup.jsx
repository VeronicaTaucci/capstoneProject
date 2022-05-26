import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signUp } from '../../actions/index'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import "../styles/signInPage.css"
const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp({ email, password }, () => {
            navigate('/')
        }))
    }
    return (
        <Form className="signInForm"
            onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control className="form-control" type="email" value={email}
        onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" />
            </Form.Group>
            <Button variant="outline-primary" size="lg" type="submit" value="Sign Up" >
                Sign Up
            </Button>
            <p>Already have an account? <Link to="/signin">Log in</Link></p>
        </Form>
    
    );
};

export default Signup;