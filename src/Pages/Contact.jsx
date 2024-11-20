import React from 'react'
import Nav from '../Components/Nav'
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../Components/Footer'
import ContactForm from '../Components/ContactForm'

const Contact = () => {
  return (
    <>
      <Nav/>
      <Container className='my-5'>
      <Row>
        <Col md={12} sm={12} lg={12} className='col-12'>
      <ContactForm/>
        </Col>
      </Row>
      </Container>
  <Footer/>
    </>
  )
}

export default Contact