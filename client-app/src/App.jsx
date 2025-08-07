import { Link } from 'react-router-dom';
import keycloak from './keycloak';

function App() {
  const user = keycloak.tokenParsed;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenue sur l'application React + Keycloak</h1>

      {user && (
        <>
          <p>Connecté en tant que : <strong>{user.preferred_username}</strong></p>
          <p>Email : {user.email}</p>
        </>
      )}

      <div style={{ marginTop: '1rem' }}>
        <Link to="/dashboard">Accéder au Dashboard sécurisé</Link>
      </div>

      <button
        style={{ marginTop: '2rem' }}
        onClick={() => keycloak.logout()}
      >
        Se déconnecter
      </button>
    </div>
  );
}

export default App;
