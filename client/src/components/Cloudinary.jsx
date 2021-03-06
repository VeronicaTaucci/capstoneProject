import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'
import Accordion from 'react-bootstrap/Accordion'
import axios from 'axios'

const Cloudinary = (props) => {
    const { triggerDisplay, setTriggerDisplay } = props;
    const [url, setUrl] = useState("");
    const [mediaFormat, setMediaFormat] = useState("");
    const userId = useSelector(state => state.userId)
    const [mediaUpload, setMediaUpload] = useState(false)

    const showWidget = (widget) => {
        widget.open()
    }

    let widget = window.cloudinary.createUploadWidget({
        cloud_name: 'dc-capstone2022',
        upload_preset: 'test2022'
    }, async (error, result) => {
        if (!error && result && result.event === 'success') {
            setUrl(result.info.url)
            // console.log(result)
            setMediaFormat(result.info.resource_type)
            setMediaUpload(true)
        } else {
            if (error) {
                console.log('error', error)
            }
        }
    });

    useEffect(() => {
        // console.log("useEffect loaded")
        if (mediaUpload) {
            // console.log("media upload fired");
            let mediaData = {
                mediaFormat: mediaFormat,
                mediaUrl: url,
                userId: userId,
            }
            // console.log("mediaData", mediaData);
            const response = axios.post('/media', mediaData, {
                headers: {
                    'authorization': localStorage.token
                }})
            // console.log("response", response);
            setMediaUpload(false)
            setTriggerDisplay(true)
        } else return
    }, [mediaUpload])

    return (
        <>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Add A Picture or Video</Accordion.Header>
                <Accordion.Body>
                    <Button variant="primary" onClick={() => showWidget(widget)} className='align-items-center'>Upload Media</Button>
                </Accordion.Body>
            </Accordion.Item>
        </>
    )
}



export default Cloudinary