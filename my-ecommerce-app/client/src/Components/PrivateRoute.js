import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function PrivateRoute({ path, ...props }) {
  return <Route path={path} {...props} />;
}

export default PrivateRoute;