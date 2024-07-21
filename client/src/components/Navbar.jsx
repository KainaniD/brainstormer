import { React, useState, useEffect } from 'react'
import axios from "../axiosConfig.js"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { currentUser } from '../context/UserContext.jsx';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

const menuVariants = {
    open: { opacity: 1, y: '0%' },
    closed: { opacity: 0, y: '20%' },
}
const menuItemVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
}

const Navbar = () => {
    const [menuActive, setMenuActive] = useState(false);
    const user = currentUser();

    const Logout = () => {
        axios.post(SERVER_URL + "/logout")
            .then(() => {
                window.location.replace(CLIENT_URL + "/login")
            })
            .catch(err => console.log(err))
    }

    function getMenuItems() {
        if (user) {
            return (<>
                <Link className="menu-item" onClick={() => setMenuActive(false)} to="/">Home</Link>
                <Link className="menu-item" onClick={() => setMenuActive(false)} to="/profile">Profile</Link>
                <Link className="menu-item" onClick={() => setMenuActive(false)} to="/sessions">Sessions</Link>
            </>);
        } else {
            return (<>
                <Link className="menu-item" onClick={() => setMenuActive(false)} to="/">Home</Link>
            </>)
        }
    }

    function getLinks() {
        if (user) {
            return (<>
                <Link className="nav-link" onClick={() => {Logout(); setMenuActive(false)}}>Logout</Link>
            </>);
        } else {
            return (<>
                <Link className="nav-link" onClick={() => setMenuActive(false)} to="/login">Login</Link>
                <Link className="nav-link" onClick={() => setMenuActive(false)} to="/register">Register</Link>
            </>)
        }
    }

    function changeMenu() {
        return setMenuActive(!menuActive);
    }


    function Routes() {
        return (
            <>
                <div className="z-50 m-6 fixed left-0 right-0 top-0 flex flex-row justify-between pt-14 px-14">
                    <button className='nav-link' onClick={changeMenu}>Menu</button>
                    <div className="flex flex-row gap-4">
                        {getLinks()}
                    </div>
                </div>
                <motion.div
                    animate={menuActive ? "open" : "closed"}
                    variants={menuItemVariants}
                    className={`m-6 fixed px-14 left-0 right-0 py-40 top-0 bottom-0 bg-purple-200 ${menuActive ? "z-45" : "-z-50"}`}>
                    <motion.div
                        animate={menuActive ? "open" : "closed"}
                        variants={menuVariants}
                        className={`flex flex-col gap-12`}>
                        {getMenuItems()}
                    </motion.div>
                </motion.div>
            </>
        )
    }

    return Routes();
}

export default Navbar