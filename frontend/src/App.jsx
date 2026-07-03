import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import CreateNote from "./pages/Create Note/CreateNote";
import Layout from "./components/Layout";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([
    { _id: 1, title: "test title", content: "test content" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/notes/fetch",
        );

        setNotes(response.data.note);

        console.log(notes);
        console.log(response.data.note);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home notes={notes} />} />
        <Route
          path="/create-note"
          element={<CreateNote setNotes={setNotes} notes={notes} />}
        />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
