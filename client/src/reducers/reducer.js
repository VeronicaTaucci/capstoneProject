import actionTypes from '../actions/actionTypes';

const initialState = {
    auth: "",
    error: "",
    comments: ""
    
}

const reducerTemplate = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.AUTH_USER:
            console.log("action.data", action.data)
            return {
                ...state,
                auth: action.data.JWT,
                userId:action.data.UserId
            }
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.data
            }
        case actionTypes.ADD_MEDIA:
            let newComment = [...state.comments, action.data.comment]
            console.log("newComment", newComment)
            return {
                ...state,
                comments:newComment
            }
        default:
            return state;
    }
}


export default reducerTemplate