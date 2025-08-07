// src/keycloak.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://keycloak:8081',
  realm: 'smart-app',
  clientId: 'react-app',
});

export default keycloak;
