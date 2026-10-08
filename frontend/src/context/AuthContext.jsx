import {
  useEffect,
  useState,
} from 'react';

import AuthContext from './AuthContext.js';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  const login = (userData, userToken) => {
    localStorage.setItem(
      'user',
      JSON.stringify(userData)
    );

    localStorage.setItem(
      'token',
      userToken
    );

    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    const handleAuthLogout = () => {
      logout();
    };

    window.addEventListener(
      'auth:logout',
      handleAuthLogout
    );

    return () => {
      window.removeEventListener(
        'auth:logout',
        handleAuthLogout
      );
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};