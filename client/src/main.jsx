import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'

const onRedirectCallback = (appState) => {
  window.history.replaceState({}, document.title, appState?.returnTo || "/");
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Auth0Provider
    domain="dev-dwidrngxdwz2oh0g.us.auth0.com"
    clientId="wY8nLLATg7elwZGL5d3QbfvjP8UlAQ4h"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  
    // useRefreshTokens={true}
    cacheLocation='localstorage'
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>
  </StrictMode>
)

