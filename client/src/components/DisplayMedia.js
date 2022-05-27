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
    const [albums, setAlbums] = useState([])
    const [changeFavouriteColor, setChangeFavouriteColor] = useState("outline-danger")


    useEffect(() => {
        let getData = async () => {
            try {
                let response = await axios.get('/comment')
                let result = response.data
                // console.log(result)
                setMedia(result)
                setTriggerDisplay(false)
                return result
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    useEffect(() => {
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
        getAlbums()
    }, [])


    const handleDelete = (media) => {
        console.log(media)
        try {
            axios.post('/delete', media);
            setTriggerDisplay(true)
        } catch (err) {
            console.log(err)
        }
    }

    const handleFavourite = (media) => {
        console.log(media)
        if (changeFavouriteColor === "outline-danger") {
            setChangeFavouriteColor("outline-warning")
            axios.post('/favourite', (media, "true"))
        } else if (changeFavouriteColor === "outline-warning") {
            setChangeFavouriteColor("outline-danger")
            axios.post('/favourite', (media, "false"))
        }
    }

    const handleAddToAlbum = (mediaId, albumId) => {
        console.log(mediaId, albumId)
        axios.post('/updatealbum', { mediaId, albumId })
    }


    return (
        <>
            <div className="row">
                <ul className="display">
                    {media.map((media) => {
                        const date = new Date(media.createdAt);
                        const tzDate = ZonedDate.fromUTCDate(date);
                        const localDt = tzDate._localDate.toString();
                        const finalDt = localDt.slice(0, 15)
                        switch (media.mediaFormat) {
                            case 'text':
                                return (
                                    <>
                                        <ListGroup.Item className="commentLi">{media.comment}
                                            {media.comment}<br /><br />
                                            Posted by: {media.user.name}<br />
                                            Post Date: {finalDt}
                                            <DropdownButton id="dropdown-basic-button" title="Add to Album...">
                                                {albums.map((album) => {
                                                    return (
                                                        <>
                                                            <Dropdown.Item href="#/action-1" onClick={() => handleAddToAlbum(media.id, album.id)}>{album.name}</Dropdown.Item>
                                                        </>
                                                    )
                                                })}
                                            </DropdownButton>
                                            <Button variant="outline-danger" onClick={() => handleDelete(media)} >
                                                <RiDeleteBin2Line size={30} /></Button>
                                            <Button variant={changeFavouriteColor} onClick={() => handleFavourite(media)}>
                                                <GrFavorite size={30} /></Button>
                                        </ListGroup.Item>
                                    </>
                                )
                            case 'image':
                                return (
                                    <>
                                        <Card className="imgCard" >
                                            <Card.Body >
                                                <Card.Img className="imgInCard" variant="top" src={media.mediaUrl} />
                                                Posted by: {media.user.name}<br />
                                                Post Date: {finalDt}
                                                <PictureModal pictureLink={media.mediaUrl} />
                                                <br />
                                                <DropdownButton id="dropdown-basic-button" title="Add to Album...">
                                                    {albums.map((album) => {
                                                        return (
                                                            <>
                                                                <Dropdown.Item href="#/action-1" onClick={() => handleAddToAlbum(media.id, album.id)}>{album.name}</Dropdown.Item>
                                                            </>
                                                        )
                                                    })}
                                                </DropdownButton>
                                                <Button variant="outline-danger" onClick={() => handleDelete(media)}><RiDeleteBin2Line size={30} /></Button>
                                                <Button variant={changeFavouriteColor} onClick={() => handleFavourite(media)}>
                                                    <GrFavorite size={30} /></Button>
                                            </Card.Body>
                                        </Card>
                                    </>)
                            case 'audio':
                                return (
                                    <>
                                        <ListGroup.Item className="commentLi">
                                            <figure>
                                                <audio className="audio" controls src={media.mediaUrl}>
                                                    Your browser does not support the <code>audio</code> element.
                                                </audio>
                                                Posted by: {media.user.name}<br />
                                                Post Date: {finalDt}
                                            </figure>
                                            <br />
                                            <DropdownButton id="dropdown-basic-button" title="Add to Album...">
                                                {albums.map((album) => {
                                                    return (
                                                        <>
                                                            <Dropdown.Item href="#/action-1" onClick={() => handleAddToAlbum(media.id, album.id)}>{album.name}</Dropdown.Item>
                                                        </>
                                                    )
                                                })}
                                            </DropdownButton>
                                            <Button variant="outline-danger" onClick={() => handleDelete(media)}><RiDeleteBin2Line size={30} /></Button>
                                            <Button variant={changeFavouriteColor} onClick={() => handleFavourite(media)}>
                                                <GrFavorite size={30} /></Button></ListGroup.Item>
                                    </>)
                            default:
                                break;
                        }
                    })}
                </ul>
            </div>
        </>
    )
}
export default DisplayMedia