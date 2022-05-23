import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { mediaUpload } from '../actions/index'
import { useDispatch } from 'react-redux'
const Cloudinary = () => {
    const dispatch = useDispatch()
    const [ url, setUrl ] = useState("");
    const [mediaFormat, setMediaFormat ] = useState("");
    const userId = useSelector(state => state.userId)


    const showWidget = (widget) => {
        widget.open()
    }


    let widget = window.cloudinary.createUploadWidget({
        cloud_name: 'dc-capstone2022',
        upload_preset: 'test2022'}, (error, result) => {
        if (!error && result && result.event === 'success') {
            // console.log(result.info)
            // console.log(result.info.url)
            // console.log(result.info.format)
            setUrl(result.info.url)
            setMediaFormat(result.info.resource_type)
            let mediaData = {
                mediaUrl: url,
                mediaFormat: mediaFormat,
                userId: userId,
            }
            dispatch(mediaUpload(mediaData))}
            else{
                if(error){
                    console.log('error', error)
                }
                else{

                }
            }
        });

    return (
        <>
            <div id='media upload'>
                <button onClick={() => showWidget(widget)}>Upload Media</button>
            </div>
        </>
    )
}



export default Cloudinary