import React, { useState, useEffect } from "react"
import { ZonedDate } from "@progress/kendo-date-math";
import '@progress/kendo-date-math/tz/all'
import axios from 'axios'
import "./styles/displayMedia.css"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import PictureModal from "./PictureModal"
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import { RiDeleteBin2Line } from 'react-icons/ri';
import { GrFavorite } from 'react-icons/gr';

const DisplayMedia = (props) => {
    const { triggerDisplay, setTriggerDisplay } = props;
    const [media, setMedia] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [sortedMedia, setSortedMedia] = useState([])
    const [changeFavouriteColor, setChangeFavouriteColor] = useState("outline-warning")


    useEffect(() => {
        
        let getData = async () => {
            try {
                let response = await axios.get('/comment')
                let result = response.data
                // console.log("result", result)
                // setMedia(result)
                const sortedMedia = [...result].sort((a, b) => (a.id < b.id) ? 1 : -1)
                // console.log("sorted result", sortedMedia)
                setSortedMedia(sortedMedia)
                setTriggerDisplay(false)
                return result
            } catch (error) {
                console.log(error)
            }
        }
        const getAlbums = async () => {
            try {
                let response = await axios.get('/getalbum')
                let result = response.data
                // console.log(result)
                setAlbums(result)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
        getAlbums()
    }, [triggerDisplay])


       


    const handleDelete = (deleteMedia) => {
        console.log(deleteMedia)
        try {
            axios.post('/delete', deleteMedia);
            setTriggerDisplay(true)
        } catch (err) {
            console.log(err)
        }
    }

    // const handleFavourite = (e) => {
    //     console.log(e.target)
    //     // if (changeFavouriteColor === "outline-warning") {
    //     //     setChangeFavouriteColor("warning")
    //     //     axios.post('/favourite', (mediaObj, "true"))
    //     // } else if (changeFavouriteColor === "warning") {
    //     //     setChangeFavouriteColor("outline-warning")
    //     //     axios.post('/favourite', (mediaObj, "false"))
    //     // }
    // }

    const handleAddToAlbum = (mediaId, albumId) => {
        console.log(mediaId, albumId)
        axios.post('/updatealbum', { mediaId, albumId })
        
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {sortedMedia.map((media, index) => {
                        const date = new Date(media.createdAt);
                        const tzDate = ZonedDate.fromUTCDate(date);
                        const localDt = tzDate._localDate.toString();
                        const finalDt = localDt.slice(0, 15)
                        switch (media.mediaFormat) {
                            case 'text':
                                {/* //! TEXT CARD */ }
                                return (
                                    <>
                                        <Card key={media.createdAt} className="imgCard justify-content-center" style={{ width: '21rem' }} >
                                            <Card.Header>{media.comment}</Card.Header><br />
                                            <Card.Text variant="end" >
                                                Posted by: {media.user.name}<br />
                                                Post Date: {finalDt}
                                            </Card.Text>
                                            <DropdownButton id="dropdown-basic-button" title="Add to Album...">
                                                {albums.map((album, index) => {
                                                    return (
                                                        <>
                                                            <Dropdown.Item key={index} href="#/action-1" onClick={() => handleAddToAlbum(media.id, album.id)}>{album.name}</Dropdown.Item>
                                                        </>
                                                    )
                                                })}
                                            </DropdownButton>
                                            <Card.Footer >
                                                {/* <Button className='outlin-warning' onClick={(e) => handleFavourite(e)}><GrFavorite size={30} /></Button> */}
                                                <Button variant="outline-danger" onClick={() => handleDelete(media)}><RiDeleteBin2Line size={30} /></Button>
                                            </Card.Footer>
                                        </Card>
                                    </>
                                )
                            case 'image':
                                {/*//! IMAGE CARD */ }
                                return (
                                    <>
                                        <Card key={media.createdAt} className="imgCard justify-content-center" style={{ width: '21rem' }} >
                                            <Card.Img className="imgInCard" variant="top" src={media.mediaUrl} />
                                            <Card.Text variant="end" >
                                                Posted by: {media.user.name}<br />
                                                Post Date: {finalDt}
                                            </Card.Text>
                                            <DropdownButton id="dropdown-basic-button" title="Add to Album...">
                                                {albums.map((album, index) => {
                                                    return (
                                                        <>
                                                            <Dropdown.Item key={index} href="#/action-1" onClick={() => handleAddToAlbum(media.id, album.id)}>{album.name}</Dropdown.Item>
                                                        </>
                                                    )
                                                })}
                                            </DropdownButton>
                                            <Card.Footer >
                                                <PictureModal modalHeading={media.comment} pictureLink={media.mediaUrl} />
                                                {/* <Button variant={changeFavouriteColor} onClick={() => handleFavourite(media)}><GrFavorite size={30} /></Button> */}
                                                <Button variant="outline-danger" onClick={() => handleDelete(media)}><RiDeleteBin2Line size={30} /></Button>
                                            </Card.Footer>
                                        </Card>
                                    </>)
                            case 'audio':
                                {/* //! AUDIO CARD */ }
                                return (
                                    <>
                                        <Card key={media.createdAt} className="imgCard justify-content-center" style={{ width: '21rem' }} >
                                            <figure>
                                                <audio className="audio" controls src={media.mediaUrl}>
                                                    Your browser does not support the <code>audio</code> element.
                                                </audio>
                                            </figure>
                                            <Card.Text className="justify-content-center" variant="end" >
                                                {media.comment}<br />
                                                Posted by: {media.user.name}<br />
                                                Post Date: {finalDt}
                                            </Card.Text>
                                            <DropdownButton id="dropdown-basic-button" title="Add to Album...">
                                                {albums.map((album, index) => {
                                                    return (
                                                        <>
                                                            <Dropdown.Item key={index} href="#/action-1" onClick={() => handleAddToAlbum(media.id, album.id)}>{album.name}</Dropdown.Item>
                                                        </>
                                                    )
                                                })}
                                            </DropdownButton>
                                            <Card.Footer >
                                                {/* <Button variant={changeFavouriteColor} onClick={() => handleFavourite(media)}><GrFavorite size={30} /></Button> */}
                                                <Button variant="outline-danger" onClick={() => handleDelete(media)}><RiDeleteBin2Line size={30} /></Button>
                                            </Card.Footer>
                                        </Card>
                                    </>)
                            default:
                                break;
                        }
                    })}
                </div>
            </div>
        </>
    )
}
export default DisplayMedia