import axios from "axios";
import "./NoteCard.css";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/notes/delete/${id}`,
      );

      setNotes((prevNotes) => prevNotes.filter(() => note._id !== id));

      alert(response.data.message);
    } catch (error) {
      console.error(
        "Error deleting note:",
        error.response?.data || error.message,
      );
    }
  };

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
        <button className="edit-btn">Edit</button>
        <button onClick={() => handleDelete(note._id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
