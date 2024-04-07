import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Services/api';
import { UserContext } from '../UserContext';
import axios from 'axios';

function Login() {
  const [username, setInputUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    console.log(userContext);
  }, [userContext]);

  const handleSubmit = event => {
    event.preventDefault();
  
    loginUser(username, password)
      .then(response => {
        const { token } = response.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setInputUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Login" />
    </form>
  );
}

export default Login;