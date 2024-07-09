import React from 'react'
import { currentUser } from '../context/UserContext'

const Rooms = () => {
    return (
    <div>
      <h1 className="text-center text-neutral-300 text-5xl">{currentUser().username}'s Profile</h1>
    </div>
    )
}

export default Rooms