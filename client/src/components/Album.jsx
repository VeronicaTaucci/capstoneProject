import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Card from 'react-bootstrap/Card'
import PictureModal from "./PictureModal"
import { ZonedDate } from "@progress/kendo-date-math";
import Navbar from './layout/Navbar'

const Album = () => {

    const  {id}  = useParams()
    const [medias, setMedias] = useState([])

    useEffect(() => {
            axios.get(`/displayalbum/${id}`, {
                headers: {
                    'authorization': localStorage.token
                }})
                .then(response => {
                    setMedias(response.data)
                    console.log(response.data);
                })
    }, [id])

    return (
        <>
            <Navbar/>
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
                                        <Card key={media.createdAt} className="imgCard justify-content-center" style={{ width: '21rem' }} >
                                            <Card.Header>{media.comment}</Card.Header><br />
                                            <Card.Text variant="end" >
                                                Post Date: {finalDt}
                                            </Card.Text>
                                        </Card>
                                    </>
                                )
                            case 'image':
                                return (
                                    <>
                                        <Card key={media.createdAt} className="imgCard justify-content-center" style={{ width: '21rem' }} >
                                            <Card.Img className="imgInCard" variant="top" src={media.mediaUrl} />
                                            <Card.Text variant="end" >
                                                Post Date: {finalDt}
                                            </Card.Text>
                                            <Card.Footer >
                                                <PictureModal modalHeading={media.comment} pictureLink={media.mediaUrl} />
                                                {/* <Button variant={changeFavouriteColor} onClick={() => handleFavourite(media)}><GrFavorite size={30} /></Button> */}
                                            </Card.Footer>
                                        </Card>
                                    </>)
                            case 'audio':
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
                                                Post Date: {finalDt}
                                            </Card.Text>
                                        </Card>
                                    </>)
                            default:
                                return <><h1>No Media to Display</h1></>
                        }
                    })}
                </ul>
            </div>
        </>
    )
}

export default Album