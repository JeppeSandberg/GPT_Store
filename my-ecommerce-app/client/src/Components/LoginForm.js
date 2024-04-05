import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Services/api';
import { UserContext } from '../UserContext';

function Login() {
  const [username, setInputUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUserId, setUsername } = useContext(UserContext);

  const handleSubmit = event => {
    event.preventDefault();

    loginUser(username, password)
      .then(response => {
        setUserId(response.data.id);
        setUsername(username);
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