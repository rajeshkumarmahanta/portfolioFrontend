import React, { useEffect, useState } from "react";
import Sidemenu from "./components/Sidemenu";
import Footer from "./components/Footer";
import AdminNav from "./components/AdminNav";
import axios from "axios";
import { toast } from "react-toastify";
import FrontendSkill from "./components/skill/FrontendSkill";
import BackendSkill from "./components/skill/BackendSkill";
import DatabaseSkill from "./components/skill/DatabaseSkill";
import LFSkill from "./components/skill/LFSkill";
import Other from "./components/skill/Other";

const AdminSkill = () => {
  return (
    <>
      <AdminNav />
      <div id="layoutSidenav">
        <Sidemenu />
        <div id="layoutSidenav_content">
          <main className="admin-right-container text-light">
            <div className="container">
              <h2 className="text-center text-decoration-underline py-3">
                Skills
              </h2>
              <FrontendSkill/>
              <BackendSkill/>
              <DatabaseSkill/>
             <LFSkill/>
              <Other/>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminSkill;
