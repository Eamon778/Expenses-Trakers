import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from "../utils";

function Signup() {
    const navigate = useNavigate();
    const [signupInfo, setSignupInfo] = useState({name: '', email: '', password: ''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const {name, email, password} = signupInfo;
        if (!name || !email || !password) {
            return handleError('Please fill all the fields');
        }
        try {
            const url = `${APIUrl}/auth/signup`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const {success, message, error} = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err){
            handleError(err)
        }
    }

    return (
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input onChange={handleChange} type="text" name="name" placeholder="Enter you name..." value={signupInfo.name} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} type="email" name="email" placeholder="Enter you email..." value={signupInfo.email} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} type="password" name="password" placeholder="Enter you password..." value={signupInfo.password} />
                </div>
                <button type="submit">Sign up</button>
                <span>Already Have an account?
                    <Link to="/login">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login;