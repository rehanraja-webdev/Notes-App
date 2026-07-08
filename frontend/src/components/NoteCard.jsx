import "./NoteCard.css";
import { useNavigate } from "react-router-dom";

const NoteCard = ({ note, handleDelete }) => {
  const navigate = useNavigate();

  const date = new Date();

  const currentDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return (
    <div className="note-card">
      <div className="note-header">
        <h2>{note.title}</h2>
        <span>{currentDate}</span>
      </div>

      <div className="note-content">
        <p>{note.content}</p>
      </div>

      <div className="btn-container">
        <button
          onClick={() => navigate(`/update-note/${note._id}`)}
          className="edit-btn"
        >
          Edit
        </button>

        <button onClick={() => handleDelete(note._id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
