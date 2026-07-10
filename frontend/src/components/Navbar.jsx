import Images from "../assets/Image-container";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  const toggle = isLoggedIn ? "/profile" : "/sign-up";
  return (
    <nav className="navbar">
      <Link to="/" className="logo-container">
        <img src={Images.logo} alt="Notes Hub Logo" className="logo" />
        <h2>NotesHub</h2>
      </Link>

      <Link to={toggle} className={isLoggedIn ? "profile-icon" : "nav-link"}>
        {isLoggedIn ? (
          <img src={Images.defaultProfile} alt="" />
        ) : (
          <button className="nav-btn">Register</button>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
