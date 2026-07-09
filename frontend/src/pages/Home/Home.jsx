import "./Home.css";
import NoteCard from "../../components/NoteCard";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { useState } from "react";

const Home = ({ notes, setNotes, user, isLoggedIn }) => {
  const [deleting, setDeleting] = useState(false);
  const handleOnClick = async (id) => {
    try {
      setDeleting(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/notes/delete/${id}`,
      );

      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setDeleting(false);
    }
  };

  if (deleting) return <LoadingSpinner />;

  return (
    <div className="homepage">
      <section className="hero-section">
        <h1>📝 Notes Hub</h1>
        <p>
          Organize your thoughts, save important ideas, and access your notes
          anytime, anywhere.
        </p>

        {notes.length > 0 && (
          <div className="hero-buttons">
            <Link to="/create-note" className="create-btn">
              Create Note
            </Link>

            <a href="#notes" className="view-btn">
              View Notes
            </a>
          </div>
        )}
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <h2>{notes.length || 0}</h2>
          <p>Total Notes</p>
        </div>

        <div className="stat-card">
          <h2>24/7</h2>
          <p>Accessible</p>
        </div>

        <div className="stat-card">
          <h2>100%</h2>
          <p>Organized</p>
        </div>
      </section>

      {/* Notes Section */}
      <section id="notes">
        {notes?.length === 0 ? (
          <div className="no-notes">
            <h1>No Notes Found</h1>
            <p>Create your first note and start organizing your thoughts.</p>
            {isLoggedIn ? (
              <Link to="/create-note" className="create-btn">
                Create Note
              </Link>
            ) : (
              <Link to="/sign-up" className="create-btn">
                Create an Account
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="section-header">
              <h2>
                {user ? `${user.fullname.split(" ")[0]}'s` : "Your"} Notes
              </h2>
              <p>Your saved notes and ideas.</p>
            </div>
            <div className="notes-container">
              {notes.length > 0 &&
                notes.map((note) => (
                  <NoteCard
                    key={note?._id}
                    note={note}
                    handleDelete={handleOnClick}
                  />
                ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
