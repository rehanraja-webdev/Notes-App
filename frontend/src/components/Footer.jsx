import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h3>📝 Notes App</h3>

        <p>Organize your thoughts, tasks, and ideas effortlessly.</p>

        <div className="footer-links">
          <a href="https://github.com/rehanraja-webdev">
            <FaGithub />
          </a>
          <a href="www.linkedin.com/in/rehan-raja-devs">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/official_rehan.0786">
            <BsInstagram />
          </a>
          <a href="mailto:rehanraja.dev@gmail.com">
            <TfiEmail />
          </a>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} Notes App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
