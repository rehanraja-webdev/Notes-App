import "./CreateNote.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../utils/LoadingSpinner";

const CreateNote = ({ setNotes }) => {
  const titleRef = useRef("");
  const contentRef = useRef("");
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      setCreating(true);
      const title = titleRef.current.value;
      const content = contentRef.current.value;

      const formData = { title, content };

      const response = await axios.post(
        "http://localhost:3000/api/notes/create",
        formData,
      );

      setNotes((prev) => [response.data.data, ...prev]);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCreating(false);
    }
  };
  if (creating) return <LoadingSpinner />;

  return (
    <div className="create-note-page">
      <div className="create-note-container">
        <h1>Create New Note</h1>
        <p className="subtitle">
          Capture your thoughts, ideas, and important information.
        </p>

        <form onSubmit={handleOnSubmit} className="note-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              ref={titleRef}
              placeholder="Enter note title..."
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              ref={contentRef}
              placeholder="Write your note here..."
              rows="3"
              required
            ></textarea>
          </div>

          <div className="button-group">
            <button type="submit" className="save-btn">
              Save Note
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

export default CreateNote;
