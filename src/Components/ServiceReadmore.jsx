import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom'
import Nav from './Nav';
import Footer from './Footer';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const ServiceReadmore = () => {
  const[singleService,setSingleService]=useState({})
    const {id} = useParams();
    useEffect(()=>{
      axios.get(`${apiUrl}/singleservice/${id}`).then((res)=>{
        setSingleService(res.data);
        
      }).catch((err)=>{
        console.log(err);
      })
    })
  return (
    <>
    <Nav/>
    <Container className='my-5'>
    <div>
    <h1 className='text-light'>{singleService.title}</h1>
    <p className='text-light'>{singleService.description}</p>
    <Button className='text-light'><Link to="/services" className='text-light link-light'>Go back</Link></Button>
    </div>
    </Container>
       <Footer/>
    </>
  )
}

export default ServiceReadmore