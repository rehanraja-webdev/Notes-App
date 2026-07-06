import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Layout.css";

const Layout = ({ user }) => {
  return (
    <div className="layout">
      <Navbar user={user} />

      <main className="layout-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
