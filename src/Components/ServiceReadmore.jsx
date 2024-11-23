import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom'
import Nav from './Nav';
import Footer from './Footer';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
import Loader from './Loader';
const ServiceReadmore = () => {
  const[singleService,setSingleService]=useState({})
  const[loading,setLoading] = useState(true);
    const {id} = useParams();
    useEffect(()=>{
      axios.get(`${apiUrl}/service/single/${id}`).then((res)=>{
        setSingleService(res.data);
        setLoading(false)
      }).catch((err)=>{
        console.log(err);
      })
    })
  return (
    <>
    <Nav/>
    {
      loading ? <Loader/> :  <Container className='my-5'>
    <div>
    <h1 className='text-light'>{singleService.title}</h1>
    <p className='text-light'>{singleService.description}</p>
    <Button className='text-light'><Link to="/services" className='text-light link-light'>Go back</Link></Button>
    </div>
    </Container>
    }
   
       <Footer/>
    </>
  )
}

export default ServiceReadmore
