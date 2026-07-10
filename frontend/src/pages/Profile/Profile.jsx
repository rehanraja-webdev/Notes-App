import axios from "axios";
import toast from "react-hot-toast";
import Images from "../../assets/Image-container";
import { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { formatDate } from "../../utils/formatDate";

function Profile({ setIsLoggedIn }) {
  const [fetching, setFetching] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
        );
        setUser(res.data.data);
      } catch {
        toast.error("Login to Continue!");
      } finally {
        setFetching(false);
      }
    };

    userData();
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      );
      toast.success(res.data.message);
      setIsLoggedIn(false);
      navigate("/sign-up");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoggingOut(false);
    }
  };

  if (loggingOut) return <LoadingSpinner />;
  if (fetching) return <LoadingSpinner />;

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
            <p>{formatDate(new Date(user.dob))}</p>
          </div>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
