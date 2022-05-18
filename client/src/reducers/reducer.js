import actionTypes from '../actions/actionTypes';

const initialState = {
    auth: "",
    error: ""
}

const reducerTemplate = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.AUTH_USER:
            return {
                ...state,
                auth: action.data
            }
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.data
            }

        default:
            return state;
    }
}


export default reducerTemplate