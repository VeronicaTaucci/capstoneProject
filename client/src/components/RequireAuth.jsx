import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const RequireAuth = ({children}) => {

    const auth = useSelector(state => state.auth)
    console.log('auth outside of useEffect', auth)
    const navigate = useNavigate();

    useEffect(() => {

        console.log("auth inside of useEffect", auth);

        if (!auth) {  //if string is empty then not logged in properly

            navigate('/')
            console.log('inside falsy of require auth no auth')
        }

    }, [auth])

    console.log(children)
    return children

}



export default RequireAuth