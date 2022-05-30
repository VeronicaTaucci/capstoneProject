import React, { useEffect, useState } from "react"
import axios from "axios"
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Button from 'react-bootstrap/Button'
import Figure from 'react-bootstrap/Button'
import { RiDeleteBin2Line } from 'react-icons/ri';
import './styles/allAlbums.css'
const AllAlbums = () => {
    const [albums, setAlbums] = useState([])
    const navigate = useNavigate()
    const [triggerDisplay, setTriggerDisplay] = useState(false)

    useEffect(() => {
        let getData = async () => {
            let getAlbums = await axios.get(`/displayalbum`)
            setAlbums(getAlbums.data)
            setTriggerDisplay(false)
            // console.log(albums);
        }
        getData()

    }, [triggerDisplay])

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
            setTriggerDisplay(true)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Navbar/>
            <div className="albums">
            {albums.length === 0 ? (<h1>No albums</h1>) :
                    albums.map((album) => {
                        return (
                            <>
                                <Card className="imgCard"  >
                                    <Card.Body onClick={() => handleClick(album)}>
                                        <h1>
                                            <Badge pill bg="light" text="dark">{album.name}</Badge>
                                        </h1>
                                        <h4>{album.description}</h4>
                                    </Card.Body>
                                        <Button variant="outline-danger" onClick={() => handleDelete(album)}><RiDeleteBin2Line size={30} /></Button>
                                </Card>
                            </>
                        )
                    })
            }
            </div>

        </>
    )
}

export default AllAlbums