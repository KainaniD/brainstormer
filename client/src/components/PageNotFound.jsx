import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
    <div className="mt-20 flex flex-col items-center gap-5">
      <h1>404 Page Not Found</h1>
      <Link className="text-neutral-300" to="/">Click here to redirect</Link>
    </div>
    )
}

export default ErrorPage
