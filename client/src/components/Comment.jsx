import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { addComment } from "../actions/index"
import "./styles/signInPage.css"
import Accordion from 'react-bootstrap/Accordion'

const Comment = (props) => {
    const { triggerDisplay, setTriggerDisplay } = props;
    const [comment, setComment] = useState("")
    const userId = useSelector(state => state.userId)
    const dispatch = useDispatch();



    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment({ comment: comment, userId: userId, mediaFormat: "text" }, () => {
            navigate('/')
        }))
        setTriggerDisplay(true)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Click to Add A Message</Accordion.Header>
                        <Accordion.Body>
                            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                            <div className="form__field">
                                <input type="submit" value="Add Comment" />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </form>
        </>
    )
}

export default Comment