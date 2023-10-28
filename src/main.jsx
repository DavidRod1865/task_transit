import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Login from './components/LoginButton.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
  domain={'dev-sepjltc5sis0ivcn.us.auth0.com'}
  clientId={'ogODyc9E2zVu7HM0v5d7XXKULOdWpL4n'}
  authorizationParams={{
    redirect_uri: "https://task-transit.vercel.app/"
  }}
  >
    <React.StrictMode>
        <Login />
    </React.StrictMode>
  </Auth0Provider>,
)
