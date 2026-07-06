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
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/notes/get");
        setNotes(response.data.notes);

        setUser(response.data.notes[0].user.fullname);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Routes>
      <Route path="/sign-up" element={<Login setNotes={setNotes} />} />

      <Route element={<Layout user={user} />}>
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/"
          element={<Home notes={notes} setNotes={setNotes} user={user} />}
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
