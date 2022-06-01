import actionTypes from './actionTypes';
import axios from 'axios'


// add a comment
export const addComment = (formData) => async dispatch => { //this is thunk, function returning another function
    try {
        //make api call to backend
        await axios.post('/comment', formData, {
            headers: {
                'authorization': localStorage.token
            }
        })
        // console.log("add comment in index.js", response)
        dispatch({
            type: actionTypes.ADD_MEDIA,
            data: {
                data: formData
            }
        })
    } catch (error) {
        console.log( error)
    }
}


export const mediaUpload = (mediaData) => async dispatch => {
    try {

        dispatch({
            type: actionTypes.ADD_OTHER_MEDIA,
            data: {
                data: mediaData
            }
        })
    } catch (error) {
        console.log(error)
    }
}


/**
 ** Registering a user
 * {email, password}
 */

export const signUp = (formData, cb) => async dispatch => {

    try {
        //api call to our backend

        let response = await axios.post('/register', formData)
        //response.data.token
        // console.log(response);  //token

        //setting our token inside of global storage
        dispatch({
            type: actionTypes.AUTH_USER,
            data: response.data.token //{userId:sasas, token: token}
        })

        cb()

        //store token in local storage

        localStorage.setItem('token', response.data.token)

    }
    catch (error) {

        console.log(error);

        dispatch({
            type: actionTypes.ERROR,
            data: error
        })
    }
}


/**
 * LoggingIn
 */


export const signIn = (formData, cb) => async dispatch => {

    try {
        //make an api call to /login
        let response = await axios.post('/login', formData)

        // console.log("logging in", response.data.token);
        dispatch({
            type: actionTypes.AUTH_USER,
            data: response.data.token
        })

        //invoke the callback function to navigate to a feature page
        cb()

        localStorage.setItem('token', response.data.token.JWT)
    }
    catch (error) {

        console.log(error)
        dispatch({
            type: actionTypes.ERROR,
            data: error
        })
    }
}

export const signOut = (cb) => dispatch => {

    // call to backend destroy token on backend
    const getToken = localStorage.getItem('token')
    // console.log('local storage before sign out - getToken', getToken)
    dispatch({
        type: actionTypes.SIGN_OUT
    })

    //clear local storage

    localStorage.removeItem('token')

    cb();  //navigate our user to some other page

}

export const checkToken = () => async dispatch => {

    if (localStorage.token) {
        try {
            let response = await axios.get('/protected', {

                headers: {
                    'authorization': localStorage.token
                }
            })

            //our token is valid

            if (response.data.isValid) {
                dispatch({
                    type: actionTypes.AUTH_USER,
                    data: localStorage.token
                })
            }
        }
        catch (error) {
            dispatch({
                type: actionTypes.ERROR,
                data: error
            })
        }
    }

}

