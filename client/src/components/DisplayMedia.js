import React, { useState, useEffect } from "react"
import { ZonedDate } from "@progress/kendo-date-math";
import '@progress/kendo-date-math/tz/all'
import axios from 'axios'
import "./styles/displayMedia.css"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import PictureModal from "./PictureModal"

const DisplayMedia = (props) => {
    const { triggerDisplay, setTriggerDisplay } = props;
    const [media, setMedia] = useState([]);

    useEffect(() => {
        let getData = async () => {
            try {
                let response = await axios.get('/comment')
                let result = response.data
                console.log(result[0].createdAt)
                setMedia(result)
                setTriggerDisplay(false)
                return result
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [triggerDisplay])




    return (
        <>
            <div >
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
                                        <ListGroup.Item className="commentLi">
                                            {media.comment}<br/><br/>
                                            Posted by: {media.user.name}<br/>
                                            Post Date: {finalDt}
                                        </ListGroup.Item>
                                    </>
                                )
                            case 'image':
                                return (
                                    <>
                                        <Card className="imgCard" >
                                            <Card.Body >
                                            <Card.Img  variant="top" src={media.mediaUrl} />
                                                <PictureModal pictureLink={media.mediaUrl} />
                                                Posted by: {media.user.name}<br/>
                                                Post Date: {finalDt}
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
                                                Posted by: {media.user.name}<br/>
                                                Post Date: {finalDt}
                                            </figure></ListGroup.Item>
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