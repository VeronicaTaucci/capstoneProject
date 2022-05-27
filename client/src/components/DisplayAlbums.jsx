import React, { useState, useEffect } from "react"
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import axios from "axios"
import CreateAlbum from "./CreateAlbum"
import Album from "./Album"
import { useNavigate } from "react-router-dom";
const DisplayAlbums = (props) => {
    const [albums, setAlbums] = useState([])
    const { triggerDisplay, setTriggerDisplay } = props;
    let navigate = useNavigate();
    useEffect(() => {
        const getAlbums = async () => {
            try {
                let response = await axios.get('/getalbum')
                let result = await response.data
                setAlbums(result)
            } catch (error) {
                console.log(error)
            }
        }
        getAlbums()
    }, [triggerDisplay])

    const handleClick = (e) => {
        e.preventDefault()
        const id = e.target.attributes.value.value

        navigate(`/album/${id}`)

    }
    return (
        <>
            <ListGroup>
                {albums.map((album) => {
                    console.log(album)
                    return (
                        <>
                            <ListGroup.Item key={album.id} value={album.id} onClick={(e) => handleClick(e)} type="button">{album.name}</ListGroup.Item>
                        </>

                    )
                })}
            </ListGroup>
        </>
    )
}

export default DisplayAlbums