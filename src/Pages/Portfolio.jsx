import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import { Container,Row,Col } from 'react-bootstrap'
import Footer from '../Components/Footer'
import PortfolioDetails from '../Components/PortfolioDetails'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
const Portfolio = () => {
  const[portfolio,setPortfolio] = useState([]);
  useEffect(()=>{
    axios.get(`${apiUrl}/project`).then((res)=>{
      setPortfolio(res.data);
    }).catch((err)=>{
      console.log(err)
    })
  },[])
 
  return (
    <>
    <Nav/>
      <Container>
      <Row>
        <Col md={12} sm={12} lg={12} className='col-12'>
        <h2 className='text-center text-light fw-bold mt-4'>Recent <span className='text-info'>Projects </span></h2>
        <ul className='custom-list'>
        {
          portfolio.length > 0 ? portfolio.map((item,i)=>{
            return <li key={i}><PortfolioDetails item={item} /></li>
          }) : "Loading..."
        }
        
      </ul>
        </Col>
      </Row>
      </Container>
      <Footer/>
    </>
  )
}

export default Portfolio