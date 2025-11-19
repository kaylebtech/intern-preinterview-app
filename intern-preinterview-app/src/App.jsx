import React, {useState} from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import './styles/base.css';
import './styles/auth.css';
import './styles/dashboard.css';

export default function App(){
  const [route, setRoute] = useState('login');
  return (
    <>
      {route === 'login' && <Login onSwitch={setRoute} />}
      {route === 'signup' && <Signup onSwitch={setRoute} />}
      {route === 'dashboard' && <Dashboard />}
    
   
    </>
  );
}