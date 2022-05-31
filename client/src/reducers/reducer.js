import actionTypes from '../actions/actionTypes';

const initialState = {
    auth: "",
    error: "",
    comments: "",
    media:""

}

const reducerTemplate = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.AUTH_USER:
            // console.log("action.data", action.data)
            return {
                ...state,
                auth: action.data,
                userId:action.data.UserId
            }
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.data
            }
        case actionTypes.ADD_MEDIA: //this is for comments
            console.log(action.data.data)
            let newComment = [...state.comments, action.data.comment]
            console.log("newComment", newComment)
            return {
                ...state,
                comments:newComment
            }
        case actionTypes.ADD_OTHER_MEDIA: //this is for pics or videos (cloudinary)
            let newMedia = [action.data.mediaData]
            return {
                media: newMedia
            }
        default:
            return state;
    }
}


export default reducerTemplate