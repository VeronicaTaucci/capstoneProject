import React from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../../actions'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import "../styles/signInPage.css"
import Navbar from '../layout/Navbar'
import FooterSignIn from "../layout/Footer02";

const Signout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signOut(() => {
            navigate('/')
        }))
    }

    return (
        <>
            <Navbar/>
            <Form className="signOutForm">
                <h3 className="text-warning">...sorry to see you go!</h3>
                <Button onClick={logout} variant="outline-primary" size="lg" type="submit" value="Log In" >
                    Sign out
                </Button>
            </Form>
            <FooterSignIn/>
        </>
    )
};

export default Signout;