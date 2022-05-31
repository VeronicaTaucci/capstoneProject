import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'

const AlbumDropdown = ({props, mediaInfo}) => {

    const { triggerDisplay, setTriggerDisplay, mediaId } = props;
    console.log('mediaId', mediaId)

    const [albums, setAlbums] = useState([]);
    // const [media, setMedia] = useState([]);

    useEffect(() => {
        const getAlbums = async () => {
            try {
                let response = await axios.get('/getalbum', {
                    headers: {
                        'authorization': localStorage.token
                    }})
                let result = response.data
                // console.log(result)
                setAlbums(result)
                setTriggerDisplay(false)
            } catch (error) {
                console.log(error)
            }
        }
        getAlbums()
    }, [triggerDisplay])

    const handleAddToAlbum = (mediaId, albumId) => {
        console.log(mediaId, albumId)
        axios.post('/updatealbum', { mediaId, albumId }, {
            headers: {
                'authorization': localStorage.token
            }})
        alert(`Added to Album`)
    }

    return (
        <>
            {albums.map((album, index) => {
                return (
                    <>
                        <Dropdown.Item key={index} href="#/action-1" onClick={() => handleAddToAlbum(mediaId, album.id)}>{album.name}</Dropdown.Item>
                    </>
                )
            })}
        </>
    )
}

export default AlbumDropdown