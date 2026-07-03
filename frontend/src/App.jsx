import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import CreateNote from "./pages/Create Note/CreateNote";
import Layout from "./components/Layout";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/notes/fetch",
        );

        setNotes(response.data.note || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [notes]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home notes={notes} setNotes={setNotes} />} />
        <Route path="/create-note" element={<CreateNote />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
