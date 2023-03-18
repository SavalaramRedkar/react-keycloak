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
    console.info("Authenticated");
  }

  //React Render on authentication
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )

  //store authentication tokens in sessionStorage for usage in app
  sessionStorage.setItem('authentication', keycloak.token as string);
  sessionStorage.setItem('refreshToken', keycloak.refreshToken as string);

  //to regenerate token on expiry
  setTimeout(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.debug('Token refreshed' + refreshed);
      } else {
        console.warn('Token not refreshed, valid for '
          + Math.round(Number((keycloak.tokenParsed as KeycloakTokenParsed).exp) + Number(keycloak.timeSkew) - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      console.error('Failed to refresh token');
    });


  }, 60000)

}).catch(() => {
  console.error("Authenticated Failed");
});


