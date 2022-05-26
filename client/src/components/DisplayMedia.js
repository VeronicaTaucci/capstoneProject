import React, { useState, useEffect } from "react"
import axios from 'axios'
import "./styles/displayMedia.css"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import PictureModal from "./PictureModal"
import { RiDeleteBin2Line } from 'react-icons/ri';
import { GrFavorite } from 'react-icons/gr';
import Button from 'react-bootstrap/Button'

const DisplayMedia = (props) => {
    const { triggerDisplay, setTriggerDisplay } = props;
    const [media, setMedia] = useState([]);
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
    }, [triggerDisplay])
    
        const handleDelete = (media) => {
            console.log(media)
                try {
                    axios.post('/delete', media);
                    setTriggerDisplay(true)
                } catch (err){
                    console.log(err)
                }
        }
    const handleFavourite = (media) => {
        console.log(media)
        if (changeFavouriteColor === "outline-danger") {
            setChangeFavouriteColor("outline-warning")
            axios.post('/favourite', (media, "true"))
        } else if (changeFavouriteColor === "outline-warning"){
            setChangeFavouriteColor("outline-danger")
            axios.post('/favourite', (media, "false"))
        }
        }



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
                                        <ListGroup.Item className="commentLi">
                                            <Button variant="outline-danger" onClick={() => handleDelete(media)} >
                                                <RiDeleteBin2Line size={30} /></Button>
                                            <Button variant={changeFavouriteColor} onClick={()=> handleFavourite(media)}>
                                                <GrFavorite size={30} /></Button>{media.comment} </ListGroup.Item>
                                       
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
                                                <Button variant="outline-danger" onClick={()=> handleDelete(media)}><RiDeleteBin2Line size={30} /></Button>
                                            </Card.Body>
                                        </Card>
                                    </>)
                            case 'audio':
                                return (
                                    <>
                                        <ListGroup.Item className="commentLi"><figure> <audio className="audio" controls src={media.mediaUrl}> Your browser does not support the <code>audio</code> element. </audio> {media.comment}<Button variant="outline-danger" onClick={() => handleDelete(media)}><RiDeleteBin2Line size={30} /></Button></figure></ListGroup.Item>
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