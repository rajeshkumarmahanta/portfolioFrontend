import React, { useState,useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const Nav = () => {
  const[links,setLinks] = useState({});
  useEffect(()=>{
    axios.get(`${apiUrl}/socialmedia`).then((res)=>{
      setLinks(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top shadow py-2">
        <div className="container-fluid">
          <div className="Logo d-block d-md-block d-sm-block d-lg-none">
            <Link
              className="navbar-brand text-light-blue text-uppercase fw-bold"
              to="/">
              <span className="rajesh">Rajesh</span>
            </Link>
          </div>
          <Button
            className="navbar-toggler text-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i className="ri-menu-line ri-lg"></i>
          </Button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarSupportedContent">
            <div className="Logo d-none d-md-none d-sm-none d-lg-block">
              <Link
                className="navbar-brand text-light-blue text-uppercase fw-bold"
                to="/">
                <span className="rajesh">Rajesh</span>
              </Link>
            </div>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item text-center">
                <NavLink className="nav-link text-light-blue nav-link-color-hover" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink className="nav-link text-light-blue nav-link-color-hover"  to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink className="nav-link text-light-blue nav-link-color-hover" to="/services">
                  Services
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink className="nav-link text-light-blue nav-link-color-hover" to="/portfolio">
                  Portfolio
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink className="nav-link text-light-blue nav-link-color-hover" to="/blog">
                  Blog
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink className="nav-link text-light-blue nav-link-color-hover" to="/gallery">
                  Gallery
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink className="nav-link text-light-blue nav-link-color-hover" to="/profilemagic">
                  Profile Magic
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink className="nav-link text-light-blue nav-link-color-hover" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <Link
                  className="nav-link text-light-blue nav-link-color-hover"
                  target="_blank"
                  to={links.github}>
                  <i className="ri-github-fill ri-lg"></i>
                </Link>
              </li>
              <li className="nav-item text-center">
                <Link
                  className="nav-link text-light-blue nav-link-color-hover"
                  target="_blank"
                  to={links.linkedin}>
                  <i className="ri-linkedin-box-fill ri-lg"></i>
                </Link>
              </li>
              <li className="nav-item text-center">
                <Link
                  className="nav-link text-light-blue nav-link-color-hover"
                  target="_blank"
                  to="https://admin-portfolio-xi.vercel.app/admin">
                  <i className="ri-lock-fill"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
