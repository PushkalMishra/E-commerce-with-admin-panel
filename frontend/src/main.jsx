import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import './index.css'
import ShopContextProvider from './Context/ShopContext.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShopContextProvider>
      <App/>
    </ShopContextProvider>
  </React.StrictMode>,
)
