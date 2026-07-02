import Images from "../assets/Image-container";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo-container">
        <img src={Images.logo} alt="Notes Hub Logo" className="logo" />
        <h2>NotesHub</h2>
      </Link>

      <Link to="/create-note" className="create-note-btn nav-links">
        + Create Note
      </Link>
    </nav>
  );
};

export default Navbar;
