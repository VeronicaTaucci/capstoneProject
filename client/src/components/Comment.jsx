import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux"

import { useNavigate } from 'react-router-dom'
import { addComment } from "../actions/index"
import DisplayComment from "./DisplayComment"
const Comment = () => {
    const [comment, setComment] = useState("")
    const  userId = useSelector(state=> state.userId)
    const userProfileId = 4;
    const dispatch = useDispatch();



    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment({ comment, userId, userProfileId }, () => {
            navigate('/')
        }))
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
                <div className="form__field">
                    <input type="submit" value="Add Comment" />
                </div>
            </form>
            <DisplayComment/>
        </>
    )
}

export default Comment