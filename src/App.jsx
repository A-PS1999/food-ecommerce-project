import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRoute from './utils/AdminRoute';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import AdminHub from './components/AdminHub/AdminHub';
import UserManagement from './components/UserManagement/UserManagement';
import CartPage from './components/CartPage/CartPage';
import NotFound from './components/NotFound/NotFound';
import './App.scss';

function App() {

  return (
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" index element={HomePage()} />
          <Route path="/register" element={Register()} />
          <Route path="/log-in" element={Login()} />
          <Route path="/admin">
              <Route index={true} element={
                <AdminRoute>
                  <AdminHub />
                </AdminRoute>
              } />
              <Route path="user-management" element={
                <AdminRoute>
                  <UserManagement />
                </AdminRoute>
              } />
          </Route>
          <Route path="/cart" element={CartPage()} />
          <Route path="*" element={NotFound()} />
        </Routes>
        <Footer />
      </>
  )
}

export default App
