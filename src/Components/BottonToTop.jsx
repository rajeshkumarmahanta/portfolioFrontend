import React, { useEffect, useRef, useState } from 'react'


const BottonToTop = () => {
  const [isvisible,setIsvisible] = useState(false);
  const listenToScroll= ()=>{
    let heighttoHidden= 100;
    const windScroll = document.body.scrollTop || document.documentElement.scrollTop;
    if(windScroll > heighttoHidden){
      setIsvisible(true);
    }else{
      setIsvisible(false);
    }

  }
  useEffect(()=>{
      window.addEventListener('scroll',listenToScroll);
      return ()=> window.removeEventListener('scroll',listenToScroll);
  },[])
   const gotobtn=()=>{
      window.scrollTo({ top: 0,left: 0, behavior:'smooth'})
   }
  return (
    <>
    {
      isvisible && <div onClick={gotobtn} className='bottomToTop cursor-pointer'>
        <span className='h1'><i className="ri-arrow-up-circle-fill ri-lg"></i></span>
       </div>
    }
       
    </>
  )
}

export default BottonToTop