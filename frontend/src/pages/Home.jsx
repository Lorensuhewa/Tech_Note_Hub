import { Link } from 'react-router-dom';

import { useAuth } from '../context/useAuth.js';

function Home() {
  const { token } = useAuth();

  return (
    <main>
      <h1>Welcome to Tech Note Hub</h1>

      <p>
        Organize your technical notes in one
        place.
      </p>

      {token ? (
        <Link to="/dashboard">
          Go to Dashboard
        </Link>
      ) : (
        <div>
          <Link to="/login">
            Login
          </Link>

          {' '}

          <Link to="/register">
            Create Account
          </Link>
        </div>
      )}
    </main>
  );
}

export default Home;