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
                let response = await axios.get('/getalbum', {
                    headers: {
                        'authorization': localStorage.token
                    }})
                let result = await response.data
                setAlbums(result)
                setTriggerDisplay(false)
            } catch (error) {
                console.log(error)
            }
        }
        getAlbums()
    }, [triggerDisplay])

    const handleClick = (e) => {
        e.preventDefault()
        console.log(e);
        const id = e.target.attributes.value.value
        navigate(`/album/${id}`)
    }
    const handleDelete = (album) => {
        const id = album.id
        console.log(id);
        setTriggerDisplay(true)
        try {
            axios.post('/displayalbum', { id }, {
                headers: {
                    'authorization': localStorage.token
                }});
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>

                {albums.map((album) => {
                    // console.log(album)
                    return (
                        <>
                            <div className="albumList" key={album.id}   type="button">
                                <tag value={album.id} onClick={(e) => handleClick(e)} className='albumName'>{album.name}</tag>
                                <tag><Button variant="outline-danger" onClick={() => handleDelete(album)}><RiDeleteBin2Line size={30} /></Button></tag>
                            </div>
                        </>
                    )
                })}
        </>
    )
}

export default DisplayAlbums