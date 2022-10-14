import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="danferg.au.auth0.com"
      clientId="Dxeiv5mmyj7yR0ZB8jZXob2R2J7aBC5V"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)
