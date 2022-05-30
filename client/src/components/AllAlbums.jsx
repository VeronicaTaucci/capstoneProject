import React, { useEffect, useState } from "react"
import axios from "axios"
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom'

import Navbar from './layout/Navbar'
import Button from 'react-bootstrap/Button'
import { RiDeleteBin2Line } from 'react-icons/ri';

const AllAlbums = () => {
    const [albums, setAlbums] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let getData = async () => {
            let getAlbums = await axios.get(`/displayalbum`)
            setAlbums(getAlbums.data)

            // console.log(albums);
        }
        getData()

    }, [])

    const handleClick = async (album) => {
        // console.log(album);
        let id = album.id
        navigate(`/album/${id}`)

    }
    const handleDelete = (album) => {
        const id = album.id
        // setTriggerDisplay(false)
        console.log(id);
        try {
            axios.post('/displayalbum', { id });
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Navbar/>
            {albums.length === 0  ? (<h1>No albums</h1>) :
                    albums.map((album) => {
                        return (
                            <>
                                <Card className="imgCard"  >
                                    <Card.Body onClick={() => handleClick(album)}>
                                        <h1>
                                            <Badge pill bg="primary">{album.name}</Badge>
                                        </h1>
                                        <h3>{album.description}</h3>
                                    </Card.Body>
                                        <Button variant="outline-danger" onClick={() => handleDelete(album)}><RiDeleteBin2Line size={30} /></Button>
                                </Card>
                            </>
                        )
                    })
            }

        </>
    )
}

export default AllAlbums