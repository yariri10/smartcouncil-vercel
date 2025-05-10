import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '/src/FirebaceConfig';
import { doc, getDoc } from 'firebase/firestore';

const MainPage = ({ user }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const back = () => {
    navigate('/');
  };

  const goToAdminPage = () => {
    navigate('/admin');
  };

  const handleButtonClick = (number) => {
    alert(`Button ${number} clicked!`);
  };

  useEffect(() => {
    const checkIfAdmin = async () => {
      if (!user || !user.email) return;
      const docRef = doc(db, 'admins', user.email);
      const docSnap = await getDoc(docRef);
      setIsAdmin(docSnap.exists());
    };
    checkIfAdmin();
  }, [user]);

  return (
    <main className="main-container">
      <p className="logged-user">
        Logged in as: <strong>{user?.email}</strong>
      </p>

      <button className="Back" onClick={back}>Back to Login</button>
      {isAdmin && (
        <button className="Back2" onClick={goToAdminPage}>Go to Admin Management</button>
      )}

      <div className="grid-buttons">
        {[...Array(9)].map((_, index) => (
          <button
            key={index}
            className="grid-button"
            onClick={() => handleButtonClick(index + 1)}
          >
            Button {index + 1}
          </button>
        ))}
      </div>
    </main>
  );
};

export default MainPage;
