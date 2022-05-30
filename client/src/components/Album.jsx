import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import PictureModal from "./PictureModal"
import { ZonedDate } from "@progress/kendo-date-math";

import Navbar from './layout/Navbar'
const Album = () => {
    const  {id}  = useParams()
    const [medias, setMedias] = useState([])


    useEffect(() => {
        let getData = async () => {
            console.log(id); //3
            let getMedia = await axios.get(`/displayalbum/${id}` )
            setMedias(getMedia.data)
            console.log(getMedia.data);
        }
        getData()

    }, [])

    return (
        <>
            <Navbar/>
            <h1>Album</h1>
            <div className="row">
                <ul className="display">
                    {medias.map((media) => {
                        const date = new Date(media.createdAt);
                        const tzDate = ZonedDate.fromUTCDate(date);
                        const localDt = tzDate._localDate.toString();
                        const finalDt = localDt.slice(0, 15)
                        switch (media.mediaFormat) {
                            case 'text':
                                return (
                                    <>
                                        <ListGroup.Item className="commentLi">
                                            {media.comment}<br /><br />
                                            Post Date: {finalDt}
                                        </ListGroup.Item>
                                    </>
                                )
                            case 'image':
                                return (
                                    <>
                                        <Card className="imgCard" >
                                            <Card.Body >
                                                <Card.Img className="imgInCard" variant="top" src={media.mediaUrl} />
                                                Post Date: {finalDt}
                                                <PictureModal pictureLink={media.mediaUrl} />
                                                <br />
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

                                                Post Date: {finalDt}
                                            </figure>
                                            <br />
                                                    </ListGroup.Item>
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

export default Album