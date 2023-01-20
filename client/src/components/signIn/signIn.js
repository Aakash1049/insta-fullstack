import React, { useState, useContext } from 'react'
import { UserContext } from '../../App'
import { Link, useNavigate } from 'react-router-dom'
import "./signIn.css"
import M from "materialize-css"

const SignIn = () => {
    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const postData = () => {
        console.log(localStorage.getItem("jwt"))
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log("err is sign in")
                    M.toast({ html: data.error, classes: "toast-error" })
                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload: data.user })
                    M.toast({ html: data.message, classes: "toast-success" })
                    navigate("/postview")
                }
            })
    }

    return (
        <>
            <div className='signin'>
                <h2 className='signin__title'>Login Page</h2>
                <div className='input-field'>
                    <input className='signin__input' type="email" size={40} value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='email' />
                </div>
                <div className='input-field'>
                    <input className='signin__input' type="password" size={40} value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='password' />
                </div>
                <button className='signin__button' onClick={() => postData()}>Login</button>
                <br />
                <Link className='signin__link' to="/signUp">Don't have an account ?</Link>
            </div>
        </>
    )
}

export default SignIn

// export default SignIn