import "./UpdateNote.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateNote = ({ setNotes, notes }) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [note, setNote] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const activeNote = notes.find((n) => n._id === id);

    if (activeNote) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(activeNote.title);
      setContent(activeNote.content);
      setNote(activeNote);
    }
  }, [id, notes]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const normalize = (str) => str.trim().replace(/\s+/g, " ");

    if (
      note &&
      normalize(title) === normalize(note.title) &&
      normalize(content) === normalize(note.content)
    ) {
      toast.error("No change found");
      return;
    }

    try {
      const cleanedTitle = normalize(title);
      const cleanedContent = normalize(content);
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/notes/update/${id}`,
        { title: cleanedTitle, content: cleanedContent },
      );

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id
            ? { ...note, title: cleanedTitle, content: cleanedContent }
            : note,
        ),
      );

      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Failed to update note");
    }
  };
  return (
    <div className="create-note-page">
      <div className="create-note-container">
        <h1>Update Note</h1>
        <p className="subtitle">
          Capture your thoughts, ideas, and important information.
        </p>

        <form onSubmit={handleOnSubmit} className="note-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows="3"
              required
            ></textarea>
          </div>

          <div className="button-group">
            <button type="submit" className="save-btn">
              Update Note
            </button>

            <Link to="/" className="cancel-btn">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNote;
