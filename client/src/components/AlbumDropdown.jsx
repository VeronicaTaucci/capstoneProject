import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'

const AlbumDropdown = (props) => {

    const { triggerDisplay, setTriggerDisplay } = props;
    const [albums, setAlbums] = useState([]);
    const [media, setMedia] = useState([]);

    useEffect(() => {
        const getAlbums = async () => {
            try {
                let response = await axios.get('/getalbum')
                let result = response.data
                // console.log(result)
                setAlbums(result)
                setTriggerDisplay(false)
            } catch (error) {
                console.log(error)
            }
        }
        getAlbums()
    }, [setTriggerDisplay])

    const handleAddToAlbum = (mediaId, albumId) => {
        console.log(mediaId, albumId)
        axios.post('/updatealbum', { mediaId, albumId })
        alert(`Added to Album`)
    }

    return (
        <>
            {albums.map((album, index) => {
                return (
                    <>
                        <Dropdown.Item key={index} href="#/action-1" onClick={() => handleAddToAlbum(media.id, album.id)}>{album.name}</Dropdown.Item>
                    </>
                )
            })}
        </>
    )
}

export default AlbumDropdown