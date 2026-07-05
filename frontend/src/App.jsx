import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import CreateNote from "./pages/Create Note/CreateNote";
import Layout from "./components/Layout";
import { useState, useEffect } from "react";
import UpdateNote from "./pages/Update Note/UpdateNote";

axios.defaults.withCredentials = true;

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/notes/get");

        setNotes(response.data.notes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              notes={notes}
              setNotes={setNotes}
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
      <Route path="/sign-up" element={<Login setNotes={setNotes} />} />
    </Routes>
  );
};

export default App;
