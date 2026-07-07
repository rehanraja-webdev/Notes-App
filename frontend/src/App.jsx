import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import CreateNote from "./pages/Create Note/CreateNote";
import Layout from "./components/Layout";
import { useState, useEffect } from "react";
import UpdateNote from "./pages/Update Note/UpdateNote";
import Profile from "./pages/Profile/Profile";

axios.defaults.withCredentials = true;

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/me");
        setUser(res.data.user);
        setIsLoggedIn(true);
      } catch {
        setUser(null);
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/notes/get");

        setNotes(response.data.notes || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Routes>
      <Route
        path="/sign-up"
        element={<Login setIsLoggedIn={setIsLoggedIn} setNotes={setNotes} />}
      />

      <Route element={<Layout isLoggedIn={isLoggedIn} />}>
        <Route
          path="/profile"
          element={<Profile setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/"
          element={
            <Home
              notes={notes}
              setNotes={setNotes}
              user={user}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/create-note"
          element={<CreateNote setNotes={setNotes} notes={notes} />}
        />
        <Route
          path="/update-note/:id"
          element={<UpdateNote setNotes={setNotes} notes={notes} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
