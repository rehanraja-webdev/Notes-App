import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h3>📝 Notes App</h3>

        <p>Organize your thoughts, tasks, and ideas effortlessly.</p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/notes">My Notes</a>
          <a href="/profile">About</a>
          <a href="/contact">Contact</a>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} Notes App. Built with React & Express.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
