import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAdmin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(false);
    navigate("/admin");
    localStorage.removeItem("admin");
  }, [setIsAdmin, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
