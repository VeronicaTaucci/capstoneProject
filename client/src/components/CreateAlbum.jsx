import axios from "axios"
import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DisplayAlbums from "./DisplayAlbums"
import { Alert, AlertTitle } from '@chakra-ui/react'
import '../components/styles/componentCss.css'
const CreateAlbum = () => {
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const userId = useSelector(state => state.userId)
    const [triggerDisplay, setTriggerDisplay] = useState(false)
    const [alert, setAlert] = useState('')
    

    const handleSubmit = (e) => {
        e.preventDefault()
        const newAlbum = {
            description,
            name,
            userId,
        }
        axios.post('/createalbum', newAlbum, {
            headers: {
                'authorization': localStorage.token
            }})
        setTriggerDisplay(true)
        setDescription('')
        setName('')
        setAlert('Album Created')
        setTimeout(() => setAlert(''), 3000);
    }
    return (
        <>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Albums</Accordion.Header>
                <Accordion.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Create an album:</Form.Label>
                            <Form.Control type="text" placeholder="album name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control as="textarea" placeholder="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Button type="submit">Create</Button>
                        <Alert status='error'>
                            <AlertTitle className="greenAlert">{alert}</AlertTitle>
                        </Alert>
                    </Form><br />
                    <DisplayAlbums triggerDisplay={triggerDisplay} setTriggerDisplay={setTriggerDisplay} />
                </Accordion.Body>
            </Accordion.Item>
        </>
    )
}

export default CreateAlbum