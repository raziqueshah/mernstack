import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <>
        <h1>404</h1>
        <h2>We are sorry, Page not found.</h2>
        <p>The page you are looking for might have been removed had its name changed or its temporarily unavailable</p>
        <Link to='/'>Back To Homepage</Link>
    </>
  )
}

export default Error