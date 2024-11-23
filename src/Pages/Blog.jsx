import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../Components/Footer'
import BlogDetails from '../Components/BlogDetails'
import axios from 'axios'
import Loader from '../Components/Loader'
const apiUrl = import.meta.env.VITE_API_URL;
const Blog = () => {
  const [blogs,setBlogs] = useState([]);
  useEffect(() => {
    axios.get(`${apiUrl}/blog`).then((res) => {
      setBlogs(res.data);
    }).catch((err) => {
      console.log(err)
    })
  }, []);
  return (
    <>
    <Nav/>
      <Container className='my-5'>
      <h2 className='text-center fw-bold text-light'>Blog</h2>
      <Row>
        <Col className='col-12' md={12} lg={12} sm={12}>
        <ul className='custom-list'>
        {blogs.length >0 ? blogs.map((item,i)=>{
          return <li key={i}><BlogDetails item={item}/></li>
        }) :  <Loader/>
         }
        </ul>
        </Col>
      </Row>
        
      </Container>
      <Footer/>
    </>
  )
}

export default Blog
