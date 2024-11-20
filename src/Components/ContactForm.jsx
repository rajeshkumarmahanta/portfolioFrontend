import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;
const ContactForm = () => {
  const [result, setResult] = React.useState("");
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [message,setMessage]=useState("")
  // const handleForm = ()=>{
  //   axios.post(`${apiUrl}/message`,{name,email,message}).then((res)=>{
  //     if(res.data){
  //        toast.success("Message sent !")
  //     }
  //     // console.log(res);
  //   }).catch((err)=>{
  //     console.log(err);
  //   })
  //   setName("");
  //   setEmail("");
  //   setMessage("");
  // }
  const onSubmit = async (event) => {
    event.preventDefault();
    axios.post(`${apiUrl}/message`,{name,email,message}).then((res)=>{
      if(res.data){
         toast.success("Message sent !")
      }
      // console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <div className="container py-4">
      <h2 className="text-center fw-bold text-light">Contact Me</h2>
      <p className="text-center text-light">How can you communicate?</p>
        <div className="d-flex justify-content-center align-items-center ">
          <form onSubmit={onSubmit} id="contactForm " className="border rounded p-3" style={{ width: "35rem" }}>
            <div className="mb-3">
              <label className="form-label text-light fw-bold" htmlFor="name">
                Name
              </label>
              <input
                className="form-control bg-transparent text-white contact-form"
                id="name"
                type="text" value={name} onChange={(e)=>setName(e.target.value)}
                placeholder="Name" name="name" required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold text-light" htmlFor="emailAddress">
                Email Address
              </label>
              <input
                className="form-control bg-transparent text-white contact-form"
                id="emailAddress"
                type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                placeholder="Email Address" name="email" required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold text-light" htmlFor="message">
                Message
              </label>
              <textarea
                className="form-control bg-transparent text-white contact-form"
                id="message"
                type="text" value={message} onChange={(e)=>setMessage(e.target.value)}
                placeholder="Message" name="message" required
                style={{ height: "10rem" }}/>
            </div>
            <div className="d-grid">
              <button className="btn contact-btn  btn-lg text-light fw-bold" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
