import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Sidemenu = () => {
  return (
    <>
        <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Admin</div>
                            <NavLink className="nav-link" to="/admin/dashboard">
                                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                Dashboard
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/home">
                                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                Home
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/about">
                                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                About
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/skill">
                                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                Skill
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/education">
                                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                Education
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/service">
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Service
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/portfolio">
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Portfolio
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/blogs">
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Blogs
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/gallery">
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Gallery
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/socialmedia">
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Social Media
                            </NavLink>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Loged in as:</div>
                        Rajesh Admin
                    </div>
                </nav>
            </div>
    </>
  )
}

export default Sidemenu