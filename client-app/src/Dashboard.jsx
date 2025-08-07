import keycloak from './keycloak';

function Dashboard() {
    const user = keycloak.tokenParsed;

    const callProtectedApi = async () => {
        console.log(keycloak.token);
        const res = await fetch('http://gateway:8080/public/users', {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });

        const data = await res.json();
        console.log(data);
        
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Tableau de bord</h2>
            <p>Bonjour {user?.preferred_username}, ceci est une route protégée.</p>

            <button onClick={callProtectedApi}>
                Appeler une API sécurisée
            </button>

            <button style={{ marginLeft: '1rem' }} onClick={() => keycloak.logout()}>
                Se déconnecter
            </button>
        </div>
    );
}

export default Dashboard;
