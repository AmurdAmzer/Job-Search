'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../favorites/Favorites.module.css';
import LoggedInHeader from '../components/LoggedinHeader';
import Footer from '../components/Footer';

export default function DashboardPage() {
  const [userId, setUserId] = useState('');
  const [notesTitle, setNotesTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [jobsCount, setJobsCount] = useState(0);
  const [savedNotes, setSavedNotes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user'));
    let id = stored?.user?._id || stored?.user?.id;
    id = String(id).replace(/^_+/, '');
    if (id) {
      setUserId(id);
      fetchNotes(id);
      fetch(`http://localhost:9999/api/favorites/${id}`)
        .then(res => res.json())
        .then(data => setJobsCount(data.length));
    }
  }, []);

  const fetchNotes = async (id) => {
    const res = await fetch(`http://localhost:9999/api/dashboard/${id}`);
    const data = await res.json();
    setSavedNotes(data.savedNotes || []);
  };

  const submitNote = async () => {
    if (!notesTitle.trim() || !notes.trim()) {
      alert('Please fill in both title and content.');
      return;
    }

    const newNote = { title: notesTitle, content: notes };
    const res = await fetch(`http://localhost:9999/api/dashboard/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newNote }),
    });

    const data = await res.json();
    setSavedNotes(data.savedNotes);
    setNotesTitle('');
    setNotes('');
  };

  const deleteNote = async (noteId) => {
    const confirmed = confirm('Are you sure you want to delete this note?');
    if (!confirmed) return;

    await fetch(`http://localhost:9999/api/dashboard/${userId}/note/${noteId}`, {
      method: 'DELETE',
    });

    setSavedNotes((prev) => prev.filter((note) => note._id !== noteId));
  };

  const saveEditedNote = async (note) => {
    await fetch(`http://localhost:9999/api/dashboard/${userId}/note/${note._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: note._editTitle, content: note._editContent }),
    });
    fetchNotes(userId);
  };

  return (
    <>
      <LoggedInHeader />
      <div className={styles.container} style={{ width: '100%', padding: '2rem 4rem' }}>
        <h1 className={styles.pageTitle}>Dashboard</h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            padding: '0 2rem',
          }}
        >
          {/* Saved Jobs */}
          <div className={styles.jobCard} style={{ flex: '1 1 250px', maxWidth: '300px' }}>
            <h2>📌 Saved Jobs</h2>
            <p>
              You’ve saved{' '}
              <span
                onClick={() => router.push('/favorites')}
                style={{
                  color: '#0070f3',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  backgroundColor: '#e0f0ff',
                  padding: '0.2rem 0.4rem',
                  borderRadius: '5px',
                }}
              >
                {jobsCount}
              </span>{' '}
              jobs
            </p>
          </div>

          {/* Notes Input */}
          <div className={styles.jobCard} style={{ flex: '2 1 400px', maxWidth: '500px', padding: '1.5rem' }}>
            <h2>📝 Notes</h2>
            <input
              type="text"
              value={notesTitle}
              onChange={(e) => setNotesTitle(e.target.value)}
              placeholder="Note title (e.g. 'Goals for May')"
              className={styles.input}
              style={{ width: '100%', marginBottom: '1rem', fontSize: '1rem', padding: '0.6rem' }}
            />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your notes here..."
              rows="8"
              className={styles.textArea}
              style={{ width: '100%', fontSize: '1rem', padding: '0.8rem', marginBottom: '1rem' }}
            />
            <button onClick={submitNote} className={styles.applyButton} style={{ padding: '0.6rem 1.2rem' }}>
              Submit Note
            </button>
          </div>

          {/* Saved Notes */}
          <div className={styles.jobCard} style={{ flex: '3 1 300px', padding: '1.5rem' }}>
            <h3>📚 Saved Notes</h3>
            {savedNotes.length === 0 ? (
              <p style={{ color: '#666' }}>No notes yet.</p>
            ) : (
              savedNotes.map((note) => {
                const isEditing = note._editing;
                return (
                  <div
                    key={note._id}
                    style={{
                      border: '1px solid #ddd',
                      padding: '1rem',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      backgroundColor: '#f9f9f9',
                      position: 'relative',
                    }}
                  >
                    <button
                      onClick={() => deleteNote(note._id)}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.75rem',
                      }}
                    >
                      Delete
                    </button>

                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={note._editTitle}
                          onChange={(e) =>
                            setSavedNotes((prev) =>
                              prev.map((n) =>
                                n._id === note._id ? { ...n, _editTitle: e.target.value } : n
                              )
                            )
                          }
                          style={{ width: '100%', marginBottom: '0.5rem', fontSize: '1rem' }}
                        />
                        <textarea
                          value={note._editContent}
                          onChange={(e) =>
                            setSavedNotes((prev) =>
                              prev.map((n) =>
                                n._id === note._id ? { ...n, _editContent: e.target.value } : n
                              )
                            )
                          }
                          rows="4"
                          style={{ width: '100%', marginBottom: '0.5rem', fontSize: '1rem' }}
                        />
                        <button
                          onClick={() => saveEditedNote(note)}
                          style={{
                            backgroundColor: 'green',
                            color: 'white',
                            border: 'none',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <h4 style={{ marginBottom: '0.5rem' }}>{note.title}</h4>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p>
                        <button
                          onClick={() =>
                            setSavedNotes((prev) =>
                              prev.map((n) =>
                                n._id === note._id
                                  ? {
                                      ...n,
                                      _editing: true,
                                      _editTitle: n.title,
                                      _editContent: n.content,
                                    }
                                  : n
                              )
                            )
                          }
                          style={{
                            marginTop: '0.5rem',
                            backgroundColor: '#0070f3',
                            color: 'white',
                            border: 'none',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                          }}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
