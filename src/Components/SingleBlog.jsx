import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
const SingleBlog = () => {
    const {id} = useParams();
    const[singleBlog,setSingleBlog] = useState({});
    const formattedDate = new Date(singleBlog.updatedAt).toDateString();
    useEffect(() => {
        axios.get(`${apiUrl}/blog/single/${id}`).then((res) => {
            setSingleBlog(res.data);
        }).catch((err) => {
          console.log(err)
        })
      }, []);
  return (
    <>
        <Nav/>
        <Container className='my-5'>
            <Row>
                <Col md={12} sm={12} lg={12} className='col-12'>
                        <div className='s-blog-box  p-2 p-sm-4 p-md-5 p-lg-5'>
                        
                            <div className='image-div'>
                                <img src={singleBlog.imageUrl} className='blog-img rounded m-auto d-block' />
                            </div>
                            <div className='text-div mt-4 border-top'>
                                <h2 className='mt-3 text-light'>{singleBlog.title}</h2>
                                <h5 className='text-secondary'><i className="ri-calendar-event-line"></i> Posted on <span className='text-secondary'>{formattedDate}</span></h5>
                                <p className='text-light'>{singleBlog.description}</p>
                                <Link className='text-decoration-underline text-light readmore-btn-blog d-flex flex-row align-items-center' to={-1}>Go back</Link>
                            </div>
                        </div>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </>
  )
}

export default SingleBlog
