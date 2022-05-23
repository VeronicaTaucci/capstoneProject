import { useDispatch, useSelector } from "react-redux"
import React, { useState, useEffect } from "react"
import axios from 'axios'

const DisplayComment = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let getData = async () => {
            try {
                let response = await axios.get('/comment')
                let result = response.data
                // console.log(result)
                setComments(result)
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

                comments display:
                <ul>
                    {comments.map((comment) => {

                        return (
                            <li key={comment.id}>{comment.comment}</li>
                        )
                })}

                </ul>
            </div>
        </>
    )
}
    export default DisplayComment