import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import CreateNote from "./pages/Create Note/CreateNote";
import Layout from "./components/Layout";
import { useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([
    {
      _id: 1,
      title: "MERN Project Ideas",
      content:
        "Build a Notes App, Chat Application, Expense Tracker, strengthen your full-stack development skills.",
    },
    {
      _id: 2,
      title: "MERN Project Ideas",
      content:
        "Build a Notes App, Chat Application, Expense Tracker, strengthen your full-stack development skills.",
    },
  ]);
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
