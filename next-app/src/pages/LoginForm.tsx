import { useState } from 'react';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8090/api/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
        });
        const data = await response.json();
        if (data.token) {
            // La connexion a réussi
            console.log('Connecté en tant que :', data.user.name);
        } else {
            // La connexion a échoué
            console.error('Échec de la connexion:', data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email :
                <input
                    type="email"
                    value={email}
                    name={"email"}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Mot de passe :
                <input
                    type="password"
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">Se connecter</button>
        </form>
    );
}