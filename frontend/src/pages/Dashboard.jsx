import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../services/api';
import { useAuth } from '../context/useAuth.js';

function Dashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    logout();

    navigate('/login');
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes');

        setNotes(response.data);
      } catch (error) {
        console.error(error);

        setMessage(
          error.response?.data?.message ||
            'Failed to load notes'
        );
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <p>
        Welcome, {user?.name || 'User'}!
      </p>

      <button onClick={handleLogout}>
        Logout
      </button>

      <h2>Your Notes</h2>

      {message && <p>{message}</p>}

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        notes.map((note) => (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;