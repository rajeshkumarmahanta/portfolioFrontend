import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";
import Portfolio from "./Pages/Portfolio";
import BottonToTop from "./Components/BottonToTop";
// import Loader from "./Components/Loader";
import Error from "./Pages/Error";
import SingleBlog from "./Components/SingleBlog";
import ServiceReadmore from "./Components/ServiceReadmore";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import ProtectedRoute from "./ProtectedRoute";
import ProfileMagic from "./Components/ProfileMagic";
import Gallery from "./Pages/Gallery";
// import Reg from "./Pages/Reg";
function App() {
 
  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* <Route path="/reg" element={<Reg />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/servicereadmore/:id" element={<ServiceReadmore />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/profilemagic/" element={<ProfileMagic />} />
        <Route path="*" element={<Error />} />
        
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
