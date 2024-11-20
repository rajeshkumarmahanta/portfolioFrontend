import React, { useEffect, useState } from 'react'
import Sidemenu from './components/Sidemenu'
import Footer from './components/Footer'
import AdminNav from './components/AdminNav'
import axios from 'axios'
import { toast } from 'react-toastify'
const apiUrl = import.meta.env.VITE_API_URL;
const SocialMedia = () => {
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [change, setChange] = useState(false);
  
  const handleSocialMedia = (e) => {
    e.preventDefault();
    axios.put(`${apiUrl}/socialmedia/${updateId}`, { instagram, facebook, github, twitter, linkedin }).then((res) => {
      // console.log(res.data);
      if (res.data.acknowledged) {
        toast.success("Updated Success !");
        setChange(!change)
      } else {
        toast.error("Error !");
      }
    
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    axios.get(`${apiUrl}/socialmedia`).then((res) => {
      console.log(res.data);
      setInstagram(res.data.instagram);
      setFacebook(res.data.facebook);
      setGithub(res.data.github);
      setTwitter(res.data.twitter);
      setLinkedin(res.data.linkedin);
      setUpdateId(res.data._id);
    }).catch((err) => {
      console.log(err);
    })
  }, [change]);
  return (
    <>
      <AdminNav />
      <div id="layoutSidenav">
        <Sidemenu />
        <div id="layoutSidenav_content">
          <main>
            <div className="container text-light">
              <h1 className='my-3'>Social Media Links</h1>
              <div className="container">
                <form action="" onSubmit={handleSocialMedia}>
                  <div className="my-3 d-flex align-items-center">
                    <label htmlFor="fb" className='text-light me-2 h4 mb-0'><i className="fa-brands fa-facebook"></i> </label>
                    <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} className='form-control text-dark w-50' id='fb' />
                  </div>
                  <div className="my-3 d-flex align-items-center">
                    <label htmlFor="fb" className='text-light me-2 h4 mb-0'><i className="fa-brands fa-instagram"></i> </label>
                    <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} className='form-control text-dark w-50' id='fb' />
                  </div>
                  <div className="my-3 d-flex align-items-center">
                    <label htmlFor="fb" className='text-light me-2 h4 mb-0'><i className="fa-brands fa-linkedin"></i> </label>
                    <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className='form-control text-dark w-50' id='fb' />
                  </div>
                  <div className="my-3 d-flex align-items-center">
                    <label htmlFor="fb" className='text-light me-2 h4 mb-0'><i className="fa-brands fa-github"></i> </label>
                    <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} className='form-control text-dark w-50' id='fb' />
                  </div>
                  <div className="my-3 d-flex align-items-center">
                    <label htmlFor="fb" className='text-light me-2 h4 mb-0'><i className="fa-brands fa-twitter"></i> </label>
                    <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} className='form-control text-dark w-50' id='fb' />
                  </div>
                  <div className="my-3 d-flex align-items-center">
                    <button type='submit' className='btn btn-primary w-25 ms-5'>Update</button>
                  </div>
                </form>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default SocialMedia