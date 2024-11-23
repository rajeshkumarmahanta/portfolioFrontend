import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Skills from "../Components/Skills";
import Education from "../Components/Education";
import Footer from "../Components/Footer";
import axios from "axios";
import Loader from "../Components/Loader";
const apiUrl = import.meta.env.VITE_API_URL;
const About = () => {
  const [resume,setResume] = useState({})
  const [about,setAbout] = useState({})
  const [frontend,setFrontend] = useState({})
  const [backend,setBackend] = useState({})
  const [database,setDatabase] = useState({})
  const [LF,setLF] = useState({})
  const [other,setOther] = useState({})
  const [education,setEducation] = useState({})
  const[loading,setLoading] = useState(true);
  useEffect(()=>{
    axios.get(`${apiUrl}/resume`).then((res)=>{
      setResume(res.data);
      
    }).catch((err)=>{
      console.log(err);
    })
    axios
      .get(`${apiUrl}/about`)
      .then((res) => {
        setAbout(res.data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
      axios.get(`${apiUrl}/frontend`).then((res) => {
        setFrontend(res.data);
      }).catch((err) => {
        console.log(err)
      });
      axios.get(`${apiUrl}/backend`).then((res) => {
        setBackend(res.data);
      }).catch((err) => {
        console.log(err)
      });
      axios.get(`${apiUrl}/database`).then((res) => {
        setDatabase(res.data);
      }).catch((err) => {
        console.log(err)
      });
      axios.get(`${apiUrl}/libraryFramework`).then((res) => {
        setLF(res.data);
      }).catch((err) => {
        console.log(err)
      });
      axios.get(`${apiUrl}/other`).then((res) => {
        setOther(res.data);
      }).catch((err) => {
        console.log(err)
      });
      axios.get(`${apiUrl}/education`).then((res) => {
        setEducation(res.data);
      }).catch((err) => {
        console.log(err)
      });

  },[]);
  // console.log(frontend);
  
  return (
    <>
      <Nav />
      {
        loading ? <Loader/> : <Container className="mt-5 pt-3">
        <Row>
          <Col md={5} sm={4} lg={5} className="col-12">
            <div className="about-img over-flow-hidden d-block m-auto rounded-1">
              <img
                src="images/ab-img.png"
                className="img-fluid rounded d-block mx-auto inner-img mt-3"
              />
            </div>
          </Col>
          <Col md={7} sm={8} lg={7} className="col-12">
            <div className=" mt-4 mt-lg-4 mt-sm-1 mt-md-1 text-white p-4 p-md-0 p-sm-0 p-lg-0">
              <p className="mb-1 text-white">Who Am I ?</p>
              { about ? <h3 className="fw-bold text-white">{about.title}</h3> : <p>loading...</p>}
              {about ? <p>{about.description}</p> : <p>loading...</p>}
              <Button className="d-cv-btn rounded">
                <Link to={`${apiUrl}/images/${resume.resume}`} target="_blank" className="text-decoration-none">
                  Download CV <i className="ri-download-2-fill ri-lg ms-1"></i>
                </Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      }
      
      <Container>
        <div className="d-flex  align-items-center justify-content-center">
          <h2 className="fw-bold text-center skill-text my-3 shadow me-3">
            <a href="#skill" className="text-decoration-none text-light">
              Skills
            </a>
          </h2>
          <h2 className="text-light mt-2">
            <i className="ri-arrow-down-circle-fill ri-lg"></i>
          </h2>
          <h2 className="fw-bold text-center skill-text my-3 shadow ms-3">
            <a href="#education" className="text-decoration-none text-light">
              Education
            </a>
          </h2>
        </div>
        <section id="skill">
          <Row>
            <Col md={12} sm={12} lg={12} className="col-12">
              <div className="res-div">
                <div className="d-block m-auto text-light">
                  <h3>Skills</h3>
                </div>
                <div className="heading d-block m-auto">
                  <h5 className="d-flex">
                    <span className="bottom-line me-2 text-uppercase text-light">
                      FRONTED
                    </span>{" "}
                    <span className="arrow-down fw-bold text-light">
                      <i className="ri-arrow-down-line ri-lg"></i>
                    </span>
                  </h5>
                </div>
                <ul className="custom-list ps-0">
                {
                  frontend.length > 0 ? frontend.map((item,i)=>{
                    return <li key={i}>
                    <Skills item={item} />
                  </li>
                  }) : "Loading..."
                }
                  
                </ul>
                <div className="heading d-block m-auto text-light">
                  <h5 className="d-flex">
                    <span className="bottom-line me-2 text-uppercase">
                      Backend
                    </span>{" "}
                    <span className="arrow-down fw-bold text-light">
                      <i className="ri-arrow-down-line ri-lg"></i>
                    </span>
                  </h5>
                </div>
                <ul className="custom-list ps-0">
                {
                  backend.length > 0 ? backend.map((item,i)=>{
                    return <li key={i}>
                    <Skills item={item} />
                  </li>
                  }) : "Loading..."
                }
                </ul>
                <div className="heading d-block text-light m-auto">
                  <h5 className="d-flex">
                    <span className="bottom-line me-2 text-uppercase">
                      Framework/Library
                    </span>{" "}
                    <span className="arrow-down fw-bold text-light">
                      <i className="ri-arrow-down-line ri-lg"></i>
                    </span>
                  </h5>
                </div>
                <ul className="custom-list ps-0">
                {
                  LF.length > 0 ? LF.map((item,i)=>{
                    return <li key={i}>
                    <Skills item={item} />
                  </li>
                  }) : "Loading..."
                }
                </ul>
                <div className="heading d-block m-auto text-light">
                  <h5 className="d-flex">
                    <span className="bottom-line me-2 text-uppercase text-light">
                      Database
                    </span>{" "}
                    <span className="arrow-down fw-bold">
                      <i className="ri-arrow-down-line ri-lg"></i>
                    </span>
                  </h5>
                </div>
                <ul className="custom-list ps-0">
                {
                  database.length > 0 ? database.map((item,i)=>{
                    return <li key={i}>
                    <Skills item={item} />
                  </li>
                  }) : "Loading..."
                }
                </ul>
                <div className="heading d-block m-auto text-light">
                  <h5 className="d-flex">
                    <span className="bottom-line me-2 text-uppercase">
                      Other
                    </span>{" "}
                    <span className="arrow-down fw-bold text-light">
                      <i className="ri-arrow-down-line ri-lg"></i>
                    </span>
                  </h5>
                </div>
                <ul className="custom-list ps-0">
                {
                  other.length > 0 ? other.map((item,i)=>{
                    return <li key={i}>
                    <Skills item={item} />
                  </li>
                  }) : "Loading..."
                }
                </ul>
              </div>
            </Col>
          </Row>
        </section>
        <section id="education">
          <Row>
            <Col md={12} sm={12} lg={12} className="col-12">
              <div className="res-div text-light">
                <div className="d-block m-auto ">
                  <h3>Education</h3>
                </div>
                <ul className="custom-list ps-0">
                {
                  education.length > 0 ? education.map((item,i)=>{
                    return <li key={i}>
                    <Education item={item} />
                  </li>
                  }) : "Loading..."
                }
                  
                </ul>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
      <Footer />
    </>
  );
};

export default About;
