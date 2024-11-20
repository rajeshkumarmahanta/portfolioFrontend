import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Hireme = () => {
  return (
    <>
        <Container fluid className='hire-me py-3 shadow mt-3'>
            <Row>
                <Col md={6}>
                <div className='ms-lg-5 ms-md-5 ms-sm-5 ps-lg-5 ps-md-5 ps-sm-5 text-center text-light text-md-start text-sm-start text-lg-start ' >
                    <h5 className='fw-bold ms-lg-5 ms-md-1 ms-sm-1 ps-lg-5 ps-md-1 ps-sm-1'>Want to work with me?</h5>
                    <p className='ms-lg-5 ms-md-1 ms-sm-1 ps-lg-5 ps-md-1 ps-sm-1'>Always feel Free to Contact & Hire me</p>
                    </div>
                </Col>
                <Col md={6}>
                <div className='mt-3'>
                        <Button className='btn btn-light d-block m-auto'><Link to="/contact" className='text-decoration-none text-dark fw-bold'>Hire me</Link></Button>
                        </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Hireme
