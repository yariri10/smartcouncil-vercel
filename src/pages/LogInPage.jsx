import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, googleProvider } from '/src/FirebaceConfig';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

const LogInPage = ({ setUser, }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      cookies.set('kidkod-user', user);
      setUser(user);

      navigate('/main');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  

  return (
    <main>
      

      <button className="login-button" onClick={handleLogin}>LOGIN</button>
    </main>
  );
};

export default LogInPage;
