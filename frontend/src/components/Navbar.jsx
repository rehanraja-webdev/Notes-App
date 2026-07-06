import Images from "../assets/Image-container";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const toggle = user ? "/profile" : "/sign-up";
  return (
    <nav className="navbar">
      <Link to="/" className="logo-container">
        <img src={Images.logo} alt="Notes Hub Logo" className="logo" />
        <h2>NotesHub</h2>
      </Link>

      <Link to={toggle} className="profile-icon nav-links">
        {user ? (
          <img src={Images.defaultProfile} alt="" />
        ) : (
          <button className="sign-up-btn">Sign UP</button>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
