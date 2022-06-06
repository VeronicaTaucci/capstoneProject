import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AlbumDropdown = ({props}) => {

    const { triggerDisplay, setTriggerDisplay, mediaId } = props;
    const [albums, setAlbums] = useState([]);

    const notify = () => toast.success('Media Added to Album', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }); 
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
        // console.log(mediaId, albumId)
        axios.post('/updatealbum', { mediaId, albumId }, {
            headers: {
                'authorization': localStorage.token
            }})
        notify()
    }

    return (
        <>
            {albums.map((album, index) => {
                return (
                    <>
                        
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                        <Dropdown.Item key={index} href="#/action-1" onClick={() => handleAddToAlbum(mediaId, album.id)}>{album.name}</Dropdown.Item>
                    </>
                )
            })}
        </>
    )
}

export default AlbumDropdown