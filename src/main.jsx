import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    
    <Auth0Provider
    domain="dev-lap3kd66usw3l32l.us.auth0.com"
    clientId="7AIpjC603sgzQ4V3bMbq7AqySsdiIu3F"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
    <App />
    </Auth0Provider>
  </React.StrictMode>,
)
