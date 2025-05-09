import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '/src/FirebaceConfig';
import { doc, getDoc } from 'firebase/firestore';

const MainPage = ({ user }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const checkIfAdmin = async () => {
    if (!user || !user.email) return;

    const docRef = doc(db, 'admins', user.email);
    const docSnap = await getDoc(docRef);
    setIsAdmin(docSnap.exists());
  };

  const goToAdminPage = () => {
    navigate('/admin');
  };

  const back = () => {
    navigate('/');
  };

  useEffect(() => {
    checkIfAdmin();
  }, [user]);

  return (
    <main>
      <p style={{ color: 'white', fontSize: '18px', textAlign: 'center', marginBottom: '20px' }}>
        Logged in as: <strong>{user?.email}</strong>
      </p>

      <button className="Back" onClick={back}>Back to Login</button>

      {isAdmin && (
        <button className="Back2" onClick={goToAdminPage}>Go to Admin Management</button>
      )}
    </main>
  );
};

export default MainPage;
