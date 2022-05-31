import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const RequireAuth = (props) => {

    // console.log(props);
    const auth = useSelector(state => state.auth)

    const navigate = useNavigate();

    useEffect(() => {

        console.log(auth);

        if (!auth) {  //if string is empty then not logged in properly

            navigate('/')
            console.log('inside falsy of require auth no auth')
        }

    }, [auth])


    return props.children

}



export default RequireAuth