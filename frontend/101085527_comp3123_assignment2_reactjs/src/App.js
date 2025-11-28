import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/Signup';
import EmployeeList from './pages/EmployeeList';

import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Navigate to="/login"/>}/>

          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>

          <Route path='/employees' element={<EmployeeList />}/>

          <Route path='*' element={<Navigate to="/login"/>}/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
