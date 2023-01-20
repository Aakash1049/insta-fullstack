import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./signUp.css"
import M from "materialize-css"

const Signup = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const postData = () => {
        console.log(name, email, password)
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "toast-error" })
                }
                else {
                    M.toast({ html: data.success, classes: "toast-success" })
                    navigate("/signin")
                }
            })
    }

    return (
        <>
            <div className='signup'>
                <h2 className='signup__title'>Create new account</h2>
                <div className='input-field'>
                    <input className='signup__input' type="text" size={40} value={name} onChange={(e) => { setName(e.target.value) }} placeholder='name' />
                </div>
                <div className='input-field'>
                    <input className='signup__input' type="email" size={40} value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='email' />
                </div>
                <div className='input-field'>
                    <input className='signup__input' type="password" size={40} value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='password' />
                </div>
                <button className='signup__button' onClick={() => postData()}>Sign up</button>
                <br />
                <Link className='signup__link' to="/signIn">Already have an account ?</Link>
            </div>
        </>
    )
}

export default Signup

