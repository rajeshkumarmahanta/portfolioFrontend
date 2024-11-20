import React, { useEffect, useState } from 'react';
import Sidemenu from './components/Sidemenu';
import Footer from './components/Footer';
import AdminNav from './components/AdminNav';;
import axios from 'axios';
import { toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_API_URL;
const AdminHome = () => {
  const [homeText,setHomeText]=useState("");
  const [updateID,setupdateID]=useState("");
  const [change, setChange] = useState(false);
    const handleHome = (e)=>{
            e.preventDefault();
            axios.put(`${apiUrl}/homeupdate/${updateID}`,{homeText}).then((res)=>{
             if(res.data.acknowledged){
             toast.success("Updated Success !");
             setChange(!change)
             }else{
              toast.error("Error !");
             }
            }).catch((err)=>{
              console.log(err)
            })
    }
    useEffect(()=>{
      axios.get(`${apiUrl}/home`).then((res)=>{
        setHomeText(res.data.homeText);
        setupdateID(res.data._id);
      }).catch((err)=>{
        console.log(err);
      })
    },[change])
  return (
    <>
    <AdminNav/>
        <div id="layoutSidenav">
            <Sidemenu/>
            <div id="layoutSidenav_content">
                <main>
                <div className="container text-light">
                  <h2 className='text-center text-decoration-underline py-3'>Home</h2>
                  <div className="">
                    <form className='p4' onSubmit={handleHome}>
                        <div className='d-flex flex-column mb-2'>
                          <label htmlFor="homeText" className='my-2 h3'>Home About text</label>
                          <textarea name="homeAboutText" id="homeText" onChange={(e)=>setHomeText(e.target.value)} value={homeText} className='form-control text-dark'/>
                          </div>
                          <div className='my-3 '>
                            <button className='btn btn-primary w-25' type='submit'>Update</button>
                          </div>
                    </form>
                  </div>
                </div>
                </main>
                <Footer/>
                </div>
        </div>
    </>
  )
}

export default AdminHome