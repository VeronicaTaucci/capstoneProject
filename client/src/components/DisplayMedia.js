import React, { useState, useEffect } from "react"
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
                console.log(result)
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
                Media display:
                <ul className="display">
                    {media.map((media) => {
                        switch (media.mediaFormat) {
                            case 'text':
                                return (
                                    <>
                                        {/* <li key={media.id}>{media.comment}</li> */}
                                        <ListGroup.Item className="commentLi">{media.comment}</ListGroup.Item>
                                    </>
                                )
                            case 'image':
                                return (
                                    <>
                                        {/* <img key={media.id} src={media.mediaUrl} width='200px'></img> */}
                                        <Card className="imgCard" >
                                            <Card.Body >
                                            <Card.Img  variant="top" src={media.mediaUrl} />
                                                <PictureModal pictureLink={media.mediaUrl} />
                                            </Card.Body>
                                        </Card>
                                    </>)
                            case 'audio':
                                return (
                                    <>

                                        <ListGroup.Item className="commentLi"><figure> <audio className="audio" controls src={media.mediaUrl}> Your browser does not support the <code>audio</code> element. </audio> </figure></ListGroup.Item>

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