import "./CreateNote.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

const CreateNote = ({ setNotes, notes }) => {
  const titleRef = useRef("");
  const contentRef = useRef("");
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const content = contentRef.current.value;

    const newNote = { _id: Date.now(), title, content };

    setNotes([...notes, newNote]);

    navigate("/");
    console.log(title, content);
  };
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
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              ref={contentRef}
              placeholder="Write your note here..."
              rows="3"
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
