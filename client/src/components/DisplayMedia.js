import { useDispatch, useSelector } from "react-redux"
import React, { useState, useEffect } from "react"
import axios from 'axios'

const DisplayMedia = () => {
    const [media, setMedia] = useState([]);

    useEffect(() => {
        let getData = async () => {
            try {
                let response = await axios.get('/comment')
                let result = response.data
                console.log(result)
                setMedia(result)
                return result
            } catch (error) {
                console.log(error)
            }

        }
        getData()

    },[])




    return (
        <>
            <div>

                Media display:
                <ul>
                    {media.map((media) => {
                        switch (media.mediaFormat) {
                            case 'text':
                                return <li key={media.id}>{media.comment}</li>
                            case 'image':
                                return <img key={media.id} src={media.mediaUrl} width='200px'></img>
                            case 'audio':
                                return <figure>
                                    <figcaption>{media.createdAt}</figcaption> <audio controls src={media.mediaUrl}> Your browser does not support the <code>audio</code> element. </audio> </figure>
                            default:
                                break;
                        }
                        // return (
                        //     <>
                        //          {/* <li key={comment.id}>{comment.comment}</li>

                        //         <li key={comment.id}>{comment.mediaUrl}</li>  */}
                        //     </>
                        // )
                })}

                </ul>
            </div>
        </>
    )
}
    export default DisplayMedia