import axios from "axios";

import Images from "../../assets/Image-container";
import { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    gender: "Male",
    dob: "2004-06-19",
  });

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/logout");
      alert(res.data.message);
      localStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
      navigate("/sign-up");
    } catch (error) {
      alert("Error while Logout", error.message);
    }
  };

  useEffect(() => {
    const userData = async () => {
      const res = await axios.get("http://localhost:3000/api/user");

      const pre = res.data.user;
      setUser((prev) => ({
        ...prev,
        fullname: pre.fullname,
        username: pre.username,
        email: pre.email,
      }));
    };

    userData();
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-image">
          <img src={Images.defaultProfile} alt="Profile" />
        </div>

        <h2>{user.fullname}</h2>
        <p className="username">@{user.username}</p>

        <div className="profile-details">
          <div className="detail-row">
            <span>Email</span>
            <p>{user.email}</p>
          </div>

          <div className="detail-row">
            <span>Gender</span>
            <p>{user.gender}</p>
          </div>

          <div className="detail-row">
            <span>Date of Birth</span>
            <p>{user.dob}</p>
          </div>
        </div>

        <div className="btn-container">
          <button onClick={handleLogout} className="logout-btn">
            Log Out
          </button>
          <button className="edit-pf-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
