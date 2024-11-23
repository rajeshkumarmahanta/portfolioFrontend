import React,{useEffect, useState} from 'react'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import "lightgallery/css/lg-autoplay.css"
import "lightgallery/css/lg-share.css"
import "lightgallery/css/lg-rotate.css"
// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgVideo from 'lightgallery/plugins/video';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';
import Loader from '../Components/Loader'
const apiUrl = import.meta.env.VITE_API_URL;
const Gallery = () => {
    const [images, setImages] = useState([]);
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    useEffect(()=>{
        axios.get(`${apiUrl}/gallery`).then((res)=>{
          setImages(res.data);
        }).catch((err)=>{
          console.log(err)
        })
      },[]);
  return (
    <>
         <Nav />
         <Container>
         <div className="container py-3">
                <h1 className="fw-light text-center text-lg-start mt-4 mb-0 text-light">Gallery</h1>
                <hr className="mt-2 mb-5" />
                <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom,lgAutoplay,lgVideo,lgShare,lgRotate]}
            >
            {
                images.length > 0 ? images.map((item,i)=>{
                    return <a href={`${apiUrl}/images/${item.image}`} key={i}>
                    <img alt={item.title} className='g-img m-2' src={`${apiUrl}/images/${item.image}`} />
                </a>
                }) : <Loader/>
            }
                
                
            </LightGallery>
            </div>
         </Container>
         <Footer/>
    </>
  )
}

export default Gallery
