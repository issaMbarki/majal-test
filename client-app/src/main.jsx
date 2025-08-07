import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import keycloak from './keycloak';

keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).then((authenticated) => {
  if (authenticated) {
    // Refresh token every 30s if needed
    // setInterval(() => {
    //   keycloak.updateToken(60).catch(() => keycloak.logout());
    // }, 30000);

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  } else {
    keycloak.login(); // fallback
  }
});
