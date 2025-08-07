import { Navigate } from 'react-router-dom';
import keycloak from './keycloak';

function ProtectedRoute({ children }) {
  if (!keycloak.authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
