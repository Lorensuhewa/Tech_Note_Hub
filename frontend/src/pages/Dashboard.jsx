import { useEffect, useState } from 'react';

import api from '../services/api';

import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';

function Dashboard() {
  const [notes, setNotes] = useState([]);

  const [editingNote, setEditingNote] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await api.get('/notes');

        setNotes(response.data);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            'Failed to load notes'
        );
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  const handleCreateNote = async (noteData) => {
    try {
      setError('');

      const response = await api.post(
        '/notes',
        noteData
      );

      setNotes((previousNotes) => [
        response.data,
        ...previousNotes,
      ]);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          'Failed to create note'
      );
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      setError('');

      const response = await api.put(
        `/notes/${editingNote._id}`,
        noteData
      );

      setNotes((previousNotes) =>
        previousNotes.map((note) =>
          note._id === editingNote._id
            ? response.data
            : note
        )
      );

      setEditingNote(null);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          'Failed to update note'
      );
    }
  };

  const handleSubmitNote = async (noteData) => {
    if (editingNote) {
      await handleUpdateNote(noteData);
    } else {
      await handleCreateNote(noteData);
    }
  };

  const handleDeleteNote = async (noteId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this note?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');

      await api.delete(`/notes/${noteId}`);

      setNotes((previousNotes) =>
        previousNotes.filter(
          (note) => note._id !== noteId
        )
      );

      if (editingNote?._id === noteId) {
        setEditingNote(null);
      }
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          'Failed to delete note'
      );
    }
  };

  return (
    <main>
      <h1>My Notes</h1>

      <NoteForm
        key={editingNote?._id || 'new'}
        onSubmit={handleSubmitNote}
        editingNote={editingNote}
        onCancel={() => setEditingNote(null)}
      />

      <section>
        <h2>Notes</h2>

        {error && (
          <p>{error}</p>
        )}

        {loading ? (
          <p>Loading notes...</p>
        ) : notes.length === 0 ? (
          <p>
            You don't have any notes yet.
          </p>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={setEditingNote}
              onDelete={handleDeleteNote}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default Dashboard;