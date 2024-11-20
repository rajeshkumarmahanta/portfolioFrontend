import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import instagramProfile from "../assets/instagramProfile.png";
import Profile from "../assets/IMG_20240724_154615_910.jpg";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
// import audio from '../assets/Justin-Bieber-feat-Quavo-Intentions-(maxnaija.com).mp3'
const ProfileMagic = () => {
  const [isPlaying, setIsPlaying] = useState(false); // State to track play/pause
  const [audio] = useState(
    new Audio(
      "images/audio/Justin-Bieber-feat-Quavo-Intentions-(maxnaija.com).mp3"
    )
  ); // Create audio instance

  // Toggle play/pause functionality
  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause(); // Pause the audio
    } else {
      audio.play(); // Play the audio
    }

    setIsPlaying(!isPlaying); // Update play/pause state
  };
  return (
    <>
      <Nav />
      <div className="container py-5 my-2">
        <div className="row">
          <div className="col-lg-6 col-md-6 d-none d-md-block d-lg-block ">
            <div className="qr-card p-5 d-flex flex-column align-items-center m-auto">
              <img
                src="images/qr.jpg"
                alt=""
                className="w-100 d-block m-auto qr-img"
              />
              <a
                href="https://www.instagram.com/rajeshrealm_/"
                target="_blank"
                className="uname-qr bg-light text-dark text-decoration-none">
                <span className="text-danger">@</span>RAJESHREALM_
              </a>
            </div>
          </div>
          <div className="col-md-6 col-12 col-lg-6">
            <div className="p-2 m-auto p-card bg-light border-2 d-flex flex-column justify-content-center">
              <div className="top-card p-3">
                <img
                  src={Profile}
                  alt=""
                  className="w-100 d-block m-auto rounded-img"
                />
                <a
                  href="https://www.instagram.com/rajeshrealm_/"
                  target="_blank"
                  className="username bg-light text-dark text-decoration-none">
                  <span className="text-danger">@</span>RAJESHREALM_
                </a>
              </div>
              <div className="bottom-card mt-2 text-center d-flex flex-column align-items-center">
                <div className="name text-dark fw-bold">RajEshRealm</div>
                <div className="about text-dark">
                  💻ᴛᴇᴄʜ ᴇɴᴛʜᴜsɪᴀsᴛ | ᴄᴏғғᴇᴇ ᴀᴅᴅɪᴄᴛ ☕ 🚀ᴄʜᴀsɪɴɢ ᴅʀᴇᴀᴍs ᴀɴᴅ
                  ʀᴇᴀᴄʜɪɴɢ ғᴏʀ ᴛʜᴇ sᴛᴀʀs ✨
                </div>
                <div className="music" onClick={togglePlayPause}>
                  <span className="px-1 left">
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </span>
                  <span>Intentions (feat.Quavo) Justin Bieber</span>
                </div>
                {/* <div className="d-none"><audio controls src={audio}></audio></div> */}
                <div className="github bg-light mt-1">
                  <span className="px-1 left-git">
                    <i class="fa-solid fa-link"></i>
                  </span>
                  <a
                    target="_blank"
                    href="https://github.com/rajeshkumarmahanta"
                    className="link-dark text-decoration-none">
                    Github.com/rajeshkumarmahanta
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileMagic;
