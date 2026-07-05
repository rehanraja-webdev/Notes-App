import "./Home.css";
import NoteCard from "../../components/NoteCard";
import { Link } from "react-router-dom";

const Home = ({ notes, setNotes, user }) => {
  return (
    <div className="homepage">
      {notes.length !== 0 && (
        <>
          <section className="hero-section">
            <h1>📝 Notes Hub</h1>
            <p>
              Organize your thoughts, save important ideas, and access your
              notes anytime, anywhere.
            </p>

            <div className="hero-buttons">
              <Link to="/create-note" className="create-btn">
                Create Note
              </Link>

              <a href="#notes" className="view-btn">
                View Notes
              </a>
            </div>
          </section>

          <section className="stats-section">
            <div className="stat-card">
              <h2>{notes.length}</h2>
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
        </>
      )}

      {/* Notes Section */}
      <section id="notes">
        {notes.length === 0 ? (
          <div className="no-notes">
            <h1>No Notes Found</h1>
            <p>Create your first note and start organizing your thoughts.</p>

            <Link to="/create-note" className="create-btn">
              Create Note
            </Link>
          </div>
        ) : (
          <>
            <div className="section-header">
              <h2>{user.split(" ")[0]}'s Notes</h2>
              <p>Your saved notes and ideas.</p>
            </div>
            <div className="notes-container">
              {notes.map((note) => (
                <NoteCard
                  key={note?._id}
                  note={note}
                  notes={notes}
                  setNotes={setNotes}
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
