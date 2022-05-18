import React from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../../actions'

const Signout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const logout = () => {

        dispatch(signOut(() => {
            navigate('/')
        }))
    }

    return <div style={{ height: "100vh" }} className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-white">Goodbye</h1>
        <h3 className="text-warning">...sorry to see you go!</h3>
        <h5 className="text-info">This page should log the user out of the application by clearing the local storage and the redux store.</h5>

        <button onClick={logout}>Sign Out</button>
    </div>
};

export default Signout;