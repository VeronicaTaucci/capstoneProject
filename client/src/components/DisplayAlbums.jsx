import React, { useState, useEffect } from "react"
import ListGroup from 'react-bootstrap/ListGroup'

import Navbar from './layout/Navbar'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { RiDeleteBin2Line } from 'react-icons/ri';
import './styles/displayAlbums.css'
const DisplayAlbums = (props) => {
    const [albums, setAlbums] = useState([])
    let navigate = useNavigate();
    const { triggerDisplay, setTriggerDisplay } = props;

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
    }, [])

    const handleClick = (e) => {
        e.preventDefault()
        const id = e.target.attributes.value.value

        navigate(`/album/${id}`)
    }
    const handleDelete = (album) => {
        const id = album.id
        console.log(id);
        try {
            axios.post('/displayalbum', { id });
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <ListGroup>
                {albums.map((album) => {
                    // console.log(album)
                    return (
                        <>
                            <ListGroup.Item className="albumList" key={album.id} value={album.id} onClick={(e) => handleClick(e)} type="button">
                                <tag>{album.name}</tag>
                                <tag><Button variant="outline-danger" onClick={() => handleDelete(album)}><RiDeleteBin2Line size={30} /></Button></tag>
                            </ListGroup.Item>
                        </>
                    )
                })}
            </ListGroup>
        </>
    )
}

export default DisplayAlbums