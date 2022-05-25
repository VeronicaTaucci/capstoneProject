import React, { useState} from "react";
import { AiOutlineZoomIn } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
const PictureModal = (pictureLink) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
            <Button variant="outline-primary"><AiOutlineZoomIn size={30} onClick={handleShow} /></Button> 
             
            

            <Modal show={show} onHide={handleClose} animation={false} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
               <img src={pictureLink.pictureLink}></img>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default PictureModal