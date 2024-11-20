import React from 'react'
import { Link } from 'react-router-dom'

const AdminError = () => {
  return (
    <>
        <div className="container py-5">
            <div className=" d-flex justify-content-center pt-5 align-items-center flex-column">
            <h3 className='text-white'>ERROR</h3>
                <Link to={-1} className='btn btn-primary'>Go back</Link>
            </div>
        </div>
    </>
  )
}

export default AdminError