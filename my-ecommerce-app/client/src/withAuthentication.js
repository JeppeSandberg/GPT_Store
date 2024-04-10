import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function withAuthentication(WrappedComponent) {
  return function ProtectedRoute(props) {
    const { username, isAdmin } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!username || !isAdmin) {
        navigate('/login');
      }
    }, [username, isAdmin, navigate]);

    return username && isAdmin ? <WrappedComponent {...props} /> : null;
  };
}

export default withAuthentication;