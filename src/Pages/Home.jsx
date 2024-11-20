import React,{useEffect, useState,} from 'react'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import {Col, Container, Row} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Hireme from '../Components/Hireme'
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const Home = () => {
  const[homeData,setHomeData] = useState({});
  const[social,setSocial] = useState({});
  const[resume,setResume] = useState({});
  useEffect(()=>{
    axios.get(`${apiUrl}/home`).then((res)=>{
      setHomeData(res.data);
    }).catch((err)=>{
      console.log(err);
    })
    axios.get(`${apiUrl}/socialmedia`).then((res)=>{
      setSocial(res.data);
      console.log(res.data)
    }).catch((err)=>{
      console.log(err);
    })
    axios.get(`${apiUrl}/resume`).then((res)=>{
      setResume(res.data);
      
    }).catch((err)=>{
      console.log(err);
    })
  },[]);
  return (
    <>
     <Nav/>
     
        <Container className='my-5 py-2'>
          <Row>
            <Col md={7} className='col-12'>
              <div className='mt-3 pt-0 mt-md-1 mt-sm-1 mt-lg-5 pt-md-1 pt-sm-1 pt-lg-5'>
                <h3 className='text-white fw-bold mb-4'>
                Hi there, I'm
                <span className='ps-2' style={{color:"#1bc2ec"}}>Rajesh</span> <span className="wave">👋</span></h3>
              
              {
                homeData ? <p className='text-light mb-4'>{homeData.homeText}  </p> : <p className='text-light mb-4'>loading...</p>
              }
                
              <ul className='d-flex social-icon-list ps-0 mt-3'>
                <li className='social-icon social-icon-facebook  mx-2'><Link target='_blank' to={social.facebook} className='link-light text-decoration-none'><i className="ri-facebook-circle-fill ri-lg"></i></Link></li>
                <li className='social-icon social-icon-twitter  mx-2'><Link target='_blank' to={social.twitter} className='link-light text-decoration-none'><i className="ri-twitter-x-line ri-lg"></i></Link></li>
                <li className='social-icon social-icon-linkedin  mx-2'><Link target='_blank' to={social.linkedin} className='link-light text-decoration-none'><i className="ri-linkedin-box-fill ri-lg"></i></Link></li>
                <li className='social-icon social-icon-instagram  mx-2'><Link target='_blank' to={social.instagram} className='link-light text-decoration-none'><i className="ri-instagram-fill ri-lg"></i></Link></li>
                <li className='social-icon social-icon-download  mx-2'><Link target='_blank' to={`${apiUrl}/images/${resume.resume}`} className='link-light text-decoration-none'><i className="ri-download-2-fill ri-lg"></i></Link></li>
              </ul>
              </div>
            </Col>
            <Col md={5} className='col-12'>
            {
              homeData ? <img src={`${apiUrl}/images/${homeData.image}`} className='img-fluid w-50 d-block m-auto'/> : <p className='text-light mb-4'>loading...</p>
            }
                
            </Col>
          </Row>
        </Container>
        <Hireme/>
        <Footer/>

    </>
  )
}

export default Home