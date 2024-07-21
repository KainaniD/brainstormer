import React from 'react'
import { currentUser } from '../context/UserContext'

const Rooms = () => {
    return (
    <div className="pt-20">
      <h1 className="text-center text-5xl font-semibold">{currentUser().username}'s Profile</h1>
    </div>
    )
}

export default Rooms