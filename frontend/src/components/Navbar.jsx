import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/useAuth.js';

function Navbar() {
  const navigate = useNavigate();

  const { user, token, logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate('/login');
  };

  return (
    <nav>
      <div>
        <Link to="/">
          Tech Note Hub
        </Link>
      </div>

      <div>
        <Link to="/">
          Home
        </Link>

        {token ? (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <span>
              {user?.name}
            </span>

            <button
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;