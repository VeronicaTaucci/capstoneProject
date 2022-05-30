import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const RequireAuth = (props) => {


    const auth = useSelector(state => state.auth)
    
    const navigate = useNavigate();

    useEffect(() => {
            console.log(auth);
        if (!auth) {  //if string is empty then not logged in properly

            navigate('/')
        }

    }, [auth])


    return props.children

}



export default RequireAuth