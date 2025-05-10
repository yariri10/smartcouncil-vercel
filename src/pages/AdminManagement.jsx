import React, { useEffect, useState } from 'react';
import { db, auth } from '/src/FirebaceConfig';
import { collection, getDocs, setDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const MAIN_ADMIN_EMAIL = 'yariri10@gmail.com';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isMainAdmin, setIsMainAdmin] = useState(false);
  const navigate = useNavigate();

  const fetchAdmins = async () => {
    const snapshot = await getDocs(collection(db, 'admins'));
    setAdmins(snapshot.docs.map(doc => doc.id));
  };

  const addAdmin = async () => {
    if (!newAdminEmail) return;
    await setDoc(doc(db, 'admins', newAdminEmail), {
      email: newAdminEmail,
      addedAt: new Date()
    });
    setNewAdminEmail('');
    fetchAdmins();
  };

  const removeAdmin = async (email) => {
    if (email === MAIN_ADMIN_EMAIL) {
      alert("You cannot remove the main admin.");
      return;
    }
    await deleteDoc(doc(db, 'admins', email));
    fetchAdmins();
  };

  useEffect(() => {
    const checkIfAdmin = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/');
        return;
      }

      if (user.email === MAIN_ADMIN_EMAIL) {
        setIsMainAdmin(true); // אתה האדמין הראשי
      }

      const docRef = doc(db, 'admins', user.email);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert("Access denied. You are not an admin.");
        navigate('/main');
      }
    };

    checkIfAdmin();
    fetchAdmins();
  }, []);

  return (
    <main className="admin-container">
      <h2 className="admin-title">Admin Management</h2>

      {/* תצוגת המייל של המשתמש */}
      <p style={{ color: 'white', fontSize: '16px', marginBottom: '20px' }}>
        Logged in as: <strong>{auth.currentUser?.email}</strong>
      </p>

      {/* טופס הוספת אדמין - רק למנהל הראשי */}
      {isMainAdmin && (
        <div className="admin-input-row">
          <input
            type="email"
            className="admin-input"
            placeholder="Enter admin email"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
          />
          <button onClick={addAdmin} className="admin-add-button">Add</button>
        </div>
      )}

      {/* רשימת אדמינים */}
      <ul className="admin-list">
        {admins.map(email => (
          <li key={email} className="admin-item">
            <span>{email}</span>
            {isMainAdmin && email !== MAIN_ADMIN_EMAIL && (
              <button onClick={() => removeAdmin(email)} className="admin-remove-button">
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>

      <button className="Back" onClick={() => navigate('/main')}>Back</button>
    </main>
  );
};

export default AdminManagement;
