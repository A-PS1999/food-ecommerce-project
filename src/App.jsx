import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRoute from './utils/AdminRoute';
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ProductPage from './pages/ProductPage/ProductPage';
import AddReviewPage from './pages/AddReviewPage/AddReviewPage';
import Wishlist from './pages/Wishlist/Wishlist';
import AdminHub from './pages/AdminHub/AdminHub';
import UserHub from './pages/UserHub/UserHub';
import ReviewsProfile from './pages/ReviewsProfile/ReviewsProfile';
import EditReviewPage from './pages/EditReviewPage/EditReviewPage';
import UserManagement from './pages/UserManagement/UserManagement';
import ProductManagement from './pages/ProductManagement/ProductManagement';
import CategoryManagement from './pages/CategoryManagement/CategoryManagement';
import OrderManagement from './pages/OrderManagement/OrderManagement';
import UserDetails from './pages/UserManagement/UserDetails/UserDetails';
import CartPage from './pages/CartPage/CartPage';
import NotFound from './pages/NotFound/NotFound';
import './App.scss';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {

  return (
      <>
        <Navbar BASE_URL={BASE_URL} />
        <Routes>
          <Route exact path="/" index element={HomePage({ BASE_URL })} />
          <Route path="/register" element={Register({ BASE_URL })} />
          <Route path="/log-in" element={Login({ BASE_URL })} />
          <Route path="/products/:productId">
            <Route index={true} element={<ProductPage BASE_URL={BASE_URL} />} />
            <Route path="add-review" element={<AddReviewPage BASE_URL={BASE_URL} />} />
          </Route>
          <Route path="/user/:userId">
            <Route index={true} element={<UserHub />} />
            <Route path="wishlist" element={<Wishlist BASE_URL={BASE_URL} />} />
            <Route path="reviews">
              <Route index={true} element={<ReviewsProfile BASE_URL={BASE_URL} />} />
              <Route path=":reviewId/edit" element={<EditReviewPage BASE_URL={BASE_URL} />} />
            </Route> 
          </Route>
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
              <Route path="category-management">
                <Route index={true} element={
                  <AdminRoute>
                    <CategoryManagement BASE_URL={BASE_URL} />
                  </AdminRoute>
                } />
              </Route>
              <Route path="order-management">
                <Route index={true} element={
                  <AdminRoute>
                    <OrderManagement BASE_URL={BASE_URL} />
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
