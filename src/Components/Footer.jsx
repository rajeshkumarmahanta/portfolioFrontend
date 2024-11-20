import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const Footer = () => {
  const [links, setLinks] = useState({});
  useEffect(() => {
    axios
      .get(`${apiUrl}/socialmedia`)
      .then((res) => {
        setLinks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <footer
        className="text-center shadow"
        style={{ backgroundColor: "#1e1e24" }}>
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <Link
              data-mdb-ripple-init
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#3b5998" }}
              to={links.facebook}
              target="_blank"
              role="button">
              <i className="ri-facebook-circle-fill"></i>
            </Link>

            <Link
              data-mdb-ripple-init
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#55acee" }}
              to={links.twitter}
              role="button"
              target="_blank">
              <i className="ri-twitter-x-fill"></i>
            </Link>

            <Link
              data-mdb-ripple-init
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              to={links.instagram}
              role="button"
              target="_blank">
              <i className="ri-instagram-line"></i>
            </Link>

            <Link
              data-mdb-ripple-init
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#0082ca" }}
              to={links.linkedin}
              target="_blank"
              role="button">
              <i className="ri-linkedin-box-fill"></i>
            </Link>

            <Link
              data-mdb-ripple-init
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#333333" }}
              to={links.github}
              role="button"
              target="_blank">
              <i className="ri-github-fill"></i>
            </Link>
          </section>
        </div>
        <div
          className="text-center p-3 text-light"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
          © 2024 Copyright:
          <Link
            className="ms-2 text-decoration-none text-light-blue text-uppercase"
            target="_blank"
            to={links.instagram}>
            developer.rajesh
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
