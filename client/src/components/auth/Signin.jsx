import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { signIn } from '../../actions'
import { useNavigate } from 'react-router-dom'
const Signin = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (e) => {

    e.preventDefault();
    dispatch(signIn({ email, password }, () => {
      navigate('/home')
    }))
  }

  return (
    <div className="mt-5">
      <div className="grid align__item">
        <div className="register">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form__field">
              <input type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="info@mailaddress.com" />
            </div>
            <div className="form__field">
              <input type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••" />
            </div>
            <div className="form__field">
              <input type="submit" value="Log In" />
            </div>
          </form>

          <p>Don't have an account? <Link to="/signup">Register Here</Link></p>

        </div>

      </div>

    </div>);
};
export default Signin