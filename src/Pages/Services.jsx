import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../Components/Footer";
import ServiceBox from "../Components/ServiceBox";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const Services = () => {
  const [services,setServices] = useState([]);
  useEffect(()=>{
    axios.get(`${apiUrl}/service`).then((res)=>{
      setServices(res.data);
      
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <>
      <Nav />
      <Container className="my-5">
        <h2 className="fw-bold text-center text-uppercase  my-4 me-3">
          <span className="skill-text text-light">Services</span>
        </h2>
        <Row>
          <Col md={12} sm={12} lg={12} className="col-12">
            <div className="d-flex align-items-center justify-content-center flex-wrap my-3">
            {
              services.length>0 ? services.map((item,i)=>{
                return  <ServiceBox key={i} item={item} />
              }) : "loading..."
            }
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Services;
