import "./NoteCard.css";

const NoteCard = ({ title, content }) => {
  const date = new Date();

  const currentDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return (
    <div className="note-card">
      <div className="note-header">
        <h2>{title}</h2>
        <span>{currentDate}</span>
      </div>

      <div className="note-content">
        <p>{content}</p>
      </div>

      <div className="btn-container">
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
