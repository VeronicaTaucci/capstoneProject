import axios from "axios"
import React, { useState } from "react"
import { useSelector } from 'react-redux'
const Albums = () => {
    const [name, setName] = useState()
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
}
   
    return (
        <>
            <form onSubmit={handleSubmit}>Create an album:<br/>
            <label>Name:</label>
             <input type="text" id="name" name="name" required
                placeholder="album name" onChange={(e)=>setName(e.target.value)}/><br/>
            <label>Description:</label> 
            <input type="text" id="description" name="description" 
                    placeholder="album description" onChange={(e)=>setDescription(e.target.value)} /> <br/>
            <button type="submit">Create</button>
            </form>
        </>
    )
}

export default Albums