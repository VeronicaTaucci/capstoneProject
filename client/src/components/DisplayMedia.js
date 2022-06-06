import React, { useState, useEffect } from "react"
import { ZonedDate } from '@progress/kendo-date-math';
import axios from 'axios'
import "./styles/displayMedia.css"
import Card from 'react-bootstrap/Card'
import DropdownButton from 'react-bootstrap/DropdownButton'
import PictureModal from "./PictureModal"
import Button from 'react-bootstrap/Button'
import { RiDeleteBin2Line } from 'react-icons/ri';
import AlbumDropdown from "./AlbumDropdown";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DisplayMedia = (props) => {
    const { triggerDisplay, setTriggerDisplay } = props;
    const [sortedMedia, setSortedMedia] = useState([])

    const notify = () => toast.success('Media Deleted', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    useEffect(() => {

        let getData = async () => {
            try {
                let response = await axios.get('/comment', {
                    headers: {
                        'authorization': localStorage.token
                    }})
                let result = response.data
                const sortedMedia = [...result].sort((a, b) => (a.id < b.id) ? 1 : -1)
                // console.log("sorted result", sortedMedia)
                setSortedMedia(sortedMedia)
                setTriggerDisplay(false)
                return result
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [triggerDisplay])

    const handleDelete = (deleteMedia) => {
        // console.log(deleteMedia)
        try {
            axios.post('/delete', deleteMedia, {
                headers: {
                    'authorization': localStorage.token
                }});
            setTriggerDisplay(true)
            // setAlert('Media Deleted')
            // setTimeout(() => setAlert(''), 3000);
            notify()
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <div className="container-fluid">
            
                <div className="row">
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
                    {/* Same as */}
                    <ToastContainer />
                    {sortedMedia.map((media, index) => {
                        const date = new Date(media.createdAt);
                        const tzDate = ZonedDate.fromUTCDate(date);
                        const localDt = tzDate._localDate.toString();
                        const finalDt = localDt.slice(0, 15)
                        const mediaId = media.id
                        const mediaInfo = {triggerDisplay, mediaId, setTriggerDisplay}

                        switch (media.mediaFormat) {
                            case 'text':
                                return (
                                    <>
                                        <Card  className="imgCard justify-content-center" style={{ width: '21rem' }} >
                                            <Card.Header>{media.comment}</Card.Header><br />
                                            <Card.Text variant="end" >
                                                Posted by: {media.user.name}<br />
                                                Post Date: {finalDt}
                                            </Card.Text>
                                            <DropdownButton id="dropdown-basic-button" title="Add to Album...">
                                                <AlbumDropdown props={mediaInfo}/>
                                            </DropdownButton>
                                            <Card.Footer >
                                                {/* <Button className='outlin-warning' onClick={(e) => handleFavourite(e)}><GrFavorite size={30} /></Button> */}
                                                <Button variant="outline-danger" onClick={() => handleDelete(media)}><RiDeleteBin2Line size={30} /></Button>
                                            </Card.Footer>
                                        </Card>
                                    </>
                                )
                            case 'image':
                                return (
                                    <>
                                        <Card  className="imgCard justify-content-center" style={{ width: '21rem' }} >
                                            <Card.Img className="imgInCard" variant="top" src={media.mediaUrl} />
                                            <Card.Text variant="end" >
                                                Posted by: {media.user.name}<br />
                                                Post Date: {finalDt}
                                            </Card.Text>
                                            <DropdownButton id="dropdown-basic-button" title="Add to Album...">
                                                <AlbumDropdown props={mediaInfo}/>
                                            </DropdownButton>
                                            <Card.Footer >
                                                <PictureModal modalHeading={media.comment} pictureLink={media.mediaUrl} />
                                                {/* <Button variant={changeFavouriteColor} onClick={() => handleFavourite(media)}><GrFavorite size={30} /></Button> */}
                                                <Button variant="outline-danger" onClick={() => handleDelete(media)}><RiDeleteBin2Line size={30} /></Button>
                                            </Card.Footer>
                                        </Card>
                                    </>
                                    )
                            case 'audio':
                                return (
                                    <>
                                        <Card  className="imgCard justify-content-center" style={{ width: '21rem' }} >
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
                                                <AlbumDropdown props={mediaInfo}/>
                                            </DropdownButton>
                                            <Card.Footer >
                                                {/* <Button variant={changeFavouriteColor} onClick={() => handleFavourite(media)}><GrFavorite size={30} /></Button> */}
                                                <Button variant="outline-danger" onClick={() => handleDelete(media)}><RiDeleteBin2Line size={30} /></Button>
                                            </Card.Footer>
                                        </Card>
                                    </>
                                    )
                            default:
                                return 
                        }
                    })}
                </div>
            </div>
        </>
    )
}
export default DisplayMedia