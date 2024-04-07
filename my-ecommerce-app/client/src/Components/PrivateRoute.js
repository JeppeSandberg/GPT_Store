import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function PrivateRoute({ path, ...props }) {
  const { userId, isAdmin } = useContext(UserContext);

  if (userId && isAdmin) {
    return <Route path={path} {...props} />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;