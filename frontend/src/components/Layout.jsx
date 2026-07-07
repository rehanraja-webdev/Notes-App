import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Layout.css";

const Layout = ({ isLoggedIn }) => {
  return (
    <div className="layout">
      <Navbar isLoggedIn={isLoggedIn} />

      <main className="layout-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
