import { Route, Routes, useActionData } from 'react-router-dom';
import './App.css';
import LogInPage from './pages/LogInPage';
import MainPage from './pages/MainPage';
import AdminManagement from './pages/AdminManagement';
import { useState } from 'react';
import Cookies from 'universal-cookie';


const cookies = new Cookies(); 

function App() {


const [user, setUser] = useState(cookies.get('kidkod-user') || null)


  return (
    <>
      <Routes>
        <Route path='/' element={<LogInPage setUser={setUser}/>} />
        <Route path='/main' element={<MainPage user={user}/>} />
        <Route path='/admin' element={<AdminManagement />} />

        <Route path='/*' element={<p>PAGE NOT FOUND</p>} />
      </Routes>


    </>
  );
}

export default App
