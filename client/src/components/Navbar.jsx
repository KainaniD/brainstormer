import { React, useState, useEffect } from 'react'
import axios from "../axiosConfig.js"
import { Link } from 'react-router-dom'
import { currentUser } from '../context/UserContext.jsx';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

const Navbar = () => {
    const user = currentUser().user;

    const Logout = () => {
        axios.post(SERVER_URL + "/logout")
        .then(() => {
            window.location.replace(CLIENT_URL + "/login")
        })
        .catch(err => console.log(err))
    }

    function Routes() {
        if (user) {
            return (
                <div className="flex flex-row justify-between mb-5 p-5">
                    <div className="flex flex-row gap-4">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Link className="nav-link" onClick={Logout}>Logout</Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex flex-row justify-between mb-5 p-5">
                    <div className="flex flex-row gap-4">
                        <Link className="nav-link" to="/">Home</Link>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/register">Register</Link>
                    </div>
                </div>
            )
        }
    }

    return Routes();
}

export default Navbar