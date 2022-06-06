import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { addComment } from "../actions/index"
import "./styles/signInPage.css"
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Alert, AlertTitle } from '@chakra-ui/react'
import '../components/styles/componentCss.css'

const Comment = (props) => {
    const { triggerDisplay, setTriggerDisplay } = props;
    const [comment, setComment] = useState("")
    const userId = useSelector(state => state.userId)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [alert, setAlert] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment({ comment: comment, userId: userId, mediaFormat: "text" }, () => {
            navigate('/')
        }))
        setComment('')
        setAlert('Message Added')
        setTriggerDisplay(true)
        setTimeout(() => setAlert(''), 3000);
    }
    return (
        <>

            <Accordion.Item eventKey="2">
                <Accordion.Header>Add A Text Message</Accordion.Header>
                <Accordion.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" type="text"  >
                            <Form.Control as="textarea" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
                        </Form.Group>
                        <Button type="submit" value="Add Comment">Add</Button>
                        <Alert status='error'>
                            <AlertTitle className="greenAlert">{alert}</AlertTitle>
                        </Alert>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>

        </>
    )
}

export default Comment