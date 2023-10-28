import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
  domain={'dev-sepjltc5sis0ivcn.us.auth0.com'}
  clientId={'ogODyc9E2zVu7HM0v5d7XXKULOdWpL4n'}
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
)
