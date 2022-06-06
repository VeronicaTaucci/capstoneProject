import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import axios from 'axios'
import ProgressBar from 'react-bootstrap/ProgressBar'
// import Alert from 'react-bootstrap/Alert'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import { Alert, AlertTitle } from '@chakra-ui/react'
import '../components/styles/componentCss.css'
//Calling the function (You can call it normally then)
const Recorder = (props) => {

    const { triggerDisplay, setTriggerDisplay } = props;

    const [recording, setRecording] = useState("")
    const [clipName, setClipName] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [progressPercent, setProgressPercent] = useState(0)
    const [recordingURL, setRecordingURL] = useState()

    const userId = useSelector(state => state.userId)
    const [alert, setAlert] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        // set up basic variables for app
        const record = document.querySelector('.record');
        const stop = document.querySelector('.stop');
        const soundClips = document.querySelector('.sound-clips');
        const canvas = document.querySelector('.visualizer');
        const mainSection = document.querySelector('.main-controls');
        // disable stop button while not recording
        stop.disabled = true;

        // visualizer setup - create web audio api context and canvas
        let audioCtx;
        const canvasCtx = canvas.getContext("2d");

        //main block for doing the audio recording
        if (navigator.mediaDevices.getUserMedia) {
            // console.log('getUserMedia supported');
            const constraints = { audio: true };
            let chunks = [];
            let onSuccess = function (stream) {
                const mediaRecorder = new MediaRecorder(stream);
                visualize(stream);
                record.onclick = function () {
                    mediaRecorder.start();
                    // console.log(mediaRecorder.state);
                    // console.log("recorder started");
                    record.style.background = "red";
                    stop.disabled = false;
                    record.disabled = true;
                }
                stop.onclick = function () {
                    mediaRecorder.stop();
                    // console.log(mediaRecorder.state);
                    // console.log("recorder stopped");
                    record.style.background = "";
                    record.style.color = "";
                    // mediaRecorder.requestData();
                    stop.disabled = true;
                    record.disabled = false;
                }
                mediaRecorder.onstop = function (e) {
                    // console.log("data available after MediaRecorder.stop() called.");
                    const clipName = prompt('Enter a name for your message:', 'My audio clip');
                    const clipContainer = document.createElement('article');
                    const clipLabel = document.createElement('p');
                    const audio = document.createElement('audio');
                    const deleteButton = document.createElement('button');
                    clipContainer.classList.add('clip');
                    audio.setAttribute('controls', '');
                    deleteButton.textContent = 'Delete Audio';
                    deleteButton.className = 'delete';
                    if (clipName === null) {
                        clipLabel.textContent = 'My Clip';
                    } else {
                        clipLabel.textContent = clipName;
                    }
                    setClipName(clipName)
                    clipContainer.appendChild(audio);
                    clipContainer.appendChild(clipLabel);
                    clipContainer.appendChild(deleteButton);//!
                    // clipContainer.appendChild(submitButton);//!
                    soundClips.appendChild(clipContainer);
                    //! BLOB
                    audio.controls = true;
                    const blob = new Blob(chunks, { 'type': 'audio/mpeg; codecs=mp3' });
                    // console.log(blob)
                    setRecording(blob)
                    chunks = [];
                    const audioURL = window.URL.createObjectURL(blob);
                    audio.src = audioURL;
                    // console.log(audioURL)
                    // console.log("recorder stopped");
                    deleteButton.onclick = function (e) {
                        let evtTgt = e.target;
                        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                    }
                    clipLabel.onclick = function () {
                        const existingName = clipLabel.textContent;
                        const newClipName = prompt('Enter a new name for your message?');
                        if (newClipName === null) {
                            clipLabel.textContent = existingName;
                        } else {
                            clipLabel.textContent = newClipName;
                        }
                        setClipName(clipName)
                    }
                }
                //function to push data to screen
                mediaRecorder.ondataavailable = function (e) {
                    chunks.push(e.data);
                }
            }
            let onError = function (err) {
                // console.log('The following error occurred: ' + err);
            }
            navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
        } else {
            // console.log('getUserMedia not supported on your browser!');
        }
        function visualize(stream) {
            if (!audioCtx) {
                audioCtx = new AudioContext();
            }
            const source = audioCtx.createMediaStreamSource(stream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 2048;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            source.connect(analyser);
            //analyser.connect(audioCtx.destination);
            draw()
            function draw() {
                const WIDTH = canvas.width
                const HEIGHT = canvas.height;
                requestAnimationFrame(draw);
                analyser.getByteTimeDomainData(dataArray);
                canvasCtx.fillStyle = '#E3F2FD'; //light blue
                canvasCtx.lineWidth = 2;
                canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
                canvasCtx.beginPath();
                let sliceWidth = WIDTH * 1.0 / bufferLength;
                let x = 0;
                for (let i = 0; i < bufferLength; i++) {
                    let v = dataArray[i] / 128.0;
                    let y = v * HEIGHT / 2;
                    if (i === 0) {
                        canvasCtx.moveTo(x, y);
                    } else {
                        canvasCtx.lineTo(x, y);
                    }
                    x += sliceWidth;
                }
                canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
                canvasCtx.lineTo(canvas.width, canvas.height / 2);
                canvasCtx.stroke();
                // canvasCtx.strokeStyle="#000000";
                // canvasCtx.strokeRect(0, 0, canvas.width, canvas.height)
            }
        }
        window.onresize = function () {
            canvas.width = mainSection.offsetWidth;
        }
        window.onresize();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAlert('Audio Submitted')
        // handleClose();
        // console.log('audioFile', recording)
        if (!recording) return;

        const storageRef = ref(storage, `audio/${clipName}`);
        const uploadTask = uploadBytesResumable(storageRef, recording);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgressPercent(progress);
                setIsLoading(false);
            },
            (error) => { console.log(error) },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(async (url) => {
                        // console.log('firebase url', url)
                        let formData = { mediaUrl: url, userId: userId, comment: clipName, mediaFormat: 'audio' }
                        let response = await axios.post('/recorder', formData, {
                            headers: {
                                'authorization': localStorage.token
                            }
                        })
                        
                        // console.log('response', response)
                        setRecordingURL(response.data.mediaUrl)
                        setTriggerDisplay(true)
                        setTimeout(() => setAlert(''), 3000);
                    })
                    
            }
        )
    }



    return (
        <>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Record A Voice Message</Accordion.Header>
                <Accordion.Body>
                    Please select 'Record' to start recording a message.  Preview or delete, and when you are satisfied with the message, click 'Submit Audio'.
                    <form>
                        <section className="main-controls">
                            <canvas className="visualizer" width='100px' height='40px'></canvas>
                                <Button className="record">Record</Button>
                                <Button className="stop">Stop</Button>
                                <section className="sound-clips"></section>
                            <Button className='submit' onClick={handleSubmit}>Submit Audio</Button>
                            <br/>
                            <Alert status='error'>
                                <AlertTitle className="greenAlert">{alert}</AlertTitle>
                            </Alert><br />
                        </section>
                    </form>

                    {/* {isLoading ? (<ProgressBar now={progressPercent} label={`${progressPercent}%`} />) : null} */}

                    <audio src={recordingURL}>
                    </audio>
                </Accordion.Body>
            </Accordion.Item>

        </>
    )
}

export default Recorder