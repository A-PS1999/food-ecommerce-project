import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import ModalContextProvider from './utils/ModalContextProvider';
import AuthContextProvider from './utils/AuthContextProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ModalContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ModalContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
