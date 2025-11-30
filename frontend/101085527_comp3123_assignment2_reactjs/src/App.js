import React from 'react';
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmployeeList from './pages/EmployeeList';
import { AuthProvider } from './context/AuthContext';
import EmployeeAdd from './pages/EmployeeAdd';
import EmployeeEdit from './pages/EmployeeEdit';
import EmployeeView from './pages/EmployeeView';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Navigate to="/login"/>}/>

          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>

          <Route path='/employees' element={<EmployeeList />}/>

          <Route path='/employees/add' element={<EmployeeAdd />}/>
          <Route path='/employees/:id' element={<EmployeeView />}/>
          <Route path='/employees/:id/edit' element={<EmployeeEdit />}/>

          <Route path='*' element={<Navigate to="/login"/>}/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
