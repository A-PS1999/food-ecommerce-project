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
import ProductManagement from './components/ProductManagement/ProductManagement';
import UserDetails from './components/UserManagement/UserDetails/UserDetails';
import CartPage from './components/CartPage/CartPage';
import NotFound from './components/NotFound/NotFound';
import './App.scss';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {

  return (
      <>
        <Navbar BASE_URL={BASE_URL} />
        <Routes>
          <Route exact path="/" index element={HomePage()} />
          <Route path="/register" element={Register({ BASE_URL })} />
          <Route path="/log-in" element={Login({ BASE_URL })} />
          <Route path="/admin">
              <Route index={true} element={
                <AdminRoute>
                  <AdminHub />
                </AdminRoute>
              } />
              <Route path="user-management">
                <Route index={true} element={
                  <AdminRoute>
                    <UserManagement BASE_URL={BASE_URL} />
                  </AdminRoute>
                } />
                <Route path="user/:userId" element={
                  <AdminRoute>
                    <UserDetails BASE_URL={BASE_URL} />
                  </AdminRoute>
                } />
              </Route>
              <Route path="product-management">
                <Route index={true} element={
                  <AdminRoute>
                    <ProductManagement BASE_URL={BASE_URL} />
                  </AdminRoute>
                } />
              </Route>
          </Route>
          <Route path="/cart" element={CartPage()} />
          <Route path="*" element={NotFound()} />
        </Routes>
        <Footer BASE_URL={BASE_URL} />
      </>
  )
}

export default App
