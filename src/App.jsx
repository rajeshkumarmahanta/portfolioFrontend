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
import Login from "./Admin/Login";
import AdminHome from "./Admin/AdminHome";
import AdminAbout from "./Admin/AdminAbout";
import AdminServices from "./Admin/AdminServices";
import SocialMedia from "./Admin/SocialMedia";
import AdminBlog from "./Admin/AdminBlog";
import AdminPortfolio from "./Admin/AdminPortfolio";
import AdminDashboard from "./Admin/AdminDashboard";
import PasswordRest from "./Admin/PasswordRest";
import AdminError from "./Admin/AdminError";
import AdminSkill from "./Admin/AdminSkill";
import AdminEdu from "./Admin/AdminEdu";
import Logout from "./Admin/Logout";
import ProtectedRoute from "./ProtectedRoute";
import Admin from './Admin/Admin'
import ProfileMagic from "./Components/ProfileMagic";
import Gallery from "./Pages/Gallery";
import AdminGallery from "./Admin/AdminGallery";
// import Reg from "./Pages/Reg";
function App() {
 
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(()=>{
    const storedAdmin = localStorage.getItem("admin");
    if(storedAdmin){
      setIsAdmin(storedAdmin);
    }
   
  },[])
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
        {/* Admin routes */}
        <Route path="/admin" element={<Login setIsAdmin={setIsAdmin} />} />
        <Route path="/logout" element={<Logout setIsAdmin={setIsAdmin} />} />
        <Route path="/admin/dashboard" element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/home" element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/about" element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminAbout />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/service" element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminServices />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/socialmedia" element={
            <ProtectedRoute isAdmin={isAdmin}>
              <SocialMedia />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/blogs" element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminBlog />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/portfolio" element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminPortfolio />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/passwordreset" element={
            <ProtectedRoute isAdmin={isAdmin}>
              <PasswordRest />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/skill" element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminSkill />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/education" element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminEdu />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/gallery" element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminGallery />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/create" element={
              <Admin />
          }
        />
         <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
