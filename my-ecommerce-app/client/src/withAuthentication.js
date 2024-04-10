import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function withAuthentication(WrappedComponent) {
  return function ProtectedRoute(props) {
    const { username } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
    console.log(username)
      if (!username) {
        navigate('/login');
      }
    }, [username, navigate]);

    return username ? <WrappedComponent {...props} /> : null;
  };
}

export default withAuthentication;