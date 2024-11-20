import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <>
      <div className='d-flex align-items-center justify-content-center flex-column' style={{height:"100vh",width:"100vw"}}>
      <h1 className='fw-bold'>Error</h1>
      <button className='btn btn-primary '><Link to={-1} className='text-decoration-none text-light'>Go back</Link></button>
      </div>
    </>
  )
}

export default Error