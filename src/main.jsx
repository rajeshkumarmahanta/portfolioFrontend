import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'remixicon/fonts/remixicon.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// admin page
import './Admin/styles.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<ToastContainer/>
    <App />
  </React.StrictMode>,
)
