import "./CreateNote.css";
import { Link } from "react-router-dom";

const CreateNote = () => {
  return (
    <div className="create-note-page">
      <div className="create-note-container">
        <h1>Create New Note</h1>
        <p className="subtitle">
          Capture your thoughts, ideas, and important information.
        </p>

        <form className="note-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter note title..."
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea placeholder="Write your note here..." rows="3"></textarea>
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
