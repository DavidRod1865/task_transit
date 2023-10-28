import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain='dev-sepjltc5sis0ivcn.us.auth0.com'
    clientId='ogODyc9E2zVu7HM0v5d7XXKULOdWpL4n'
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://task-transit.vercel.app/api/v2/",
      scope: "read:current_user update:current_user_metadata"
    }}
  >
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Auth0Provider>,
);
