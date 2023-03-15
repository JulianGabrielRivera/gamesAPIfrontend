import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './auth/login';
import Signup from './auth/signup';
import Profile from './pages/Profile';
import Games from './pages/Games';
import GameDetail from './pages/GamesDetail';

import './App.css';
import Library from './pages/Library';

function App() {

  const getToken = () => {
    return localStorage.getItem("authToken")
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };



  return (
    <div>

      <Navbar />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/games' element={<Games />} />
 
        <Route path="/games/:id" element={<GameDetail/>} ></Route>
        
        <Route element={<LoggedIn />} >

          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/mylibrary' element={<Library />} />
          
        </Route>

        <Route element={<NotLoggedIn />} >

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          
        </Route>


      </Routes>


    </div>
  );
}

export default App;
