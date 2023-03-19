import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Keycloak, { KeycloakTokenParsed } from 'keycloak-js';

const initOptions = {
  url: 'http://localhost:8080/',
  realm: 'react-keycloak',
  clientId: 'myclient',
  KeycloakResponseType: 'code'
}
export const keycloak = new Keycloak(initOptions);

//Initialization of the keycloak instance
keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {

  if (!authenticated) {
    window.location.reload();
  } else {
    console.info("Authenticated ", keycloak);
  }

  //React Render on authentication
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )

}).catch(() => {
  console.error("Authenticated Failed");
});


