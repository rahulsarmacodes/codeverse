import React, { useState, useEffect } from "react";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";
import Sidebar from "../../component/navbar/Sidebar";
import EditUser from "../../component/edit/EditUser";
import EditSocials from "../../component/edit/EditSocials"
import EditPlateforms from "../../component/edit/EditPlateforms"
import EditAccount from "../../component/edit/EditAccount"
import { jwtDecode } from "jwt-decode";
import { getUserProfile } from "../../services/api";

const Edit = () => {
  const [selectedOption, setselectedOption] = useState("Profile Info");
  const [userdata, setUserdata] = useState({});

  async function getUserData(username) {
    try {
      const res = await getUserProfile(username);
      setUserdata(res.data[0] || {});
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  }

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decode = jwtDecode(token);
        if (decode?.username) {
          getUserData(decode.username);
        }
      }
    } catch (err) {
      console.error("Token decoding error:", err);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }, []);

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case "Profile Info":
        return <EditUser data={userdata} />;
      case "Coding Profiles":
        return <EditPlateforms data={userdata} />;
      case "Socials":
        return <EditSocials data={userdata.social} />;
      case "Account":
        return <EditAccount />;
      default:
        return <EditUser data={userdata} />;
    }
  };
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col md:flex-row bg-gray-100 pt-20 p-4 md:p-6 md:pt-24 gap-4 w-full min-h-screen">
        <Sidebar selectedOption={selectedOption} setselectedOption={setselectedOption} />
        <div className="flex-1 min-w-0">
          {renderSelectedComponent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Edit;
