import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signUp } from '../../actions/index'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {

        e.preventDefault();

        //dispatch an action 
        //action is going to make the api call

        //signUp(1, 2)
        dispatch(signUp({ email, password }, () => {
            navigate('/')
        }))


    }

    return (
        <div className="mt-5">
            <div className="grid align__item">
                <div className="register">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form__field">
                            <input type="email" value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="enter email address" />
                        </div>
                        <div className="form__field">
                            <input type="password"
                                onChange={e => setPassword(e.target.value)}
                                value={password} placeholder="enter password" />
                        </div>

                        <div className="form__field">
                            <input type="submit" value="Sign Up" />
                        </div>

                    </form>

                    <p>Already have an account? <Link to="/signin">Log in</Link></p>

                </div>

            </div>

        </div>);
};

export default Signup;