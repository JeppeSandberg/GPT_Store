import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function PrivateRoute({ children }) {
  const { username } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [username, navigate]);

  
}

export default PrivateRoute;

