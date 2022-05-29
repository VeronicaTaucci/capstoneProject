import axios from "axios"
import React, { useState } from "react"
import { useSelector } from 'react-redux'
import Accordion from 'react-bootstrap/Accordion'

const CreateAlbum = (props) => {
    const [name, setName] = useState()
    const { triggerDisplay, setTriggerDisplay } = props;
    const [description, setDescription] = useState()
    const userId = useSelector(state => state.userId)

    const handleSubmit = (e) => {
        e.preventDefault()
        const newAlbum = {
            description,
            name,
            userId,
        }
        axios.post('/createalbum', newAlbum)
        setTriggerDisplay(true)
    }
    return (
        <>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Albums</Accordion.Header>
                <Accordion.Body>
                    <form onSubmit={handleSubmit}>Create an album:<br />
                        <label>Name:</label>
                        <input type="text" id="name" name="name" required
                            placeholder="album name" onChange={(e) => setName(e.target.value)} /><br />
                        <label>Description:</label>
                        <input type="text" id="description" name="description"
                            placeholder="album description" onChange={(e) => setDescription(e.target.value)} /> <br />
                        <button type="submit">Create</button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
        </>
    )
}

export default CreateAlbum