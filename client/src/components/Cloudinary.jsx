import React, {useState} from 'react'

const Cloudinary = () => {

    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");

    const showWidget = (widget) => {
        widget.open()
    }


    let widget = window.cloudinary.createUploadWidget({
        cloud_name: 'dc-capstone2022',
        upload_preset: 'test2022'}, (error, result) => {
            if (!error && result && result.event === 'success') {
                console.log(result.info)
                console.log(result.info.url)
                setUrl(result.info.url)
                console.log(url)
            }
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