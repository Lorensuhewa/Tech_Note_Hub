import { useEffect, useState } from 'react';

import api from './services/api';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await api.get('/');
        setMessage(response.data.message);
      } catch (error) {
        console.error(
          'Error connecting to backend:',
          error
        );

        setMessage('Unable to connect to backend');
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Tech Note Hub</h1>

      <p>{message}</p>
    </div>
  );
}

export default App;