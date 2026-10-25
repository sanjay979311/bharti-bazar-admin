import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
// Toastify Imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget the CSS!

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import './index.css'
import AppRoutes from './AppRoutes.jsx';
import { Provider } from 'react-redux'
import { store } from './redux/store.js';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(


  <StrictMode>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <Provider store={store}>

      <BrowserRouter>
        {/* <App /> */}


        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>

  ,
)
