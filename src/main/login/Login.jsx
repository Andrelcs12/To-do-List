import React, { useState } from "react";
import './Login.css';

function Login({ setAuthenticated }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    const { email, password } = credentials;

    if (!email.trim() || !password.trim()) {
      setError('E-mail e senha são obrigatórios');
      return;
    }

    if (email === email && password === password) {
      setAuthenticated(true);
      localStorage.setItem('authenticated', true);
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="login-container">
      <h1>Lista To-Do</h1>
      <h2>Login</h2>

      <input
        type="email"
        name="email"
        className="input-field"
        placeholder="E-mail"
        value={credentials.email}
        onChange={handleInputChange}
      />

      <input
        type="password"
        name="password"
        className="input-field"
        placeholder="Senha"
        value={credentials.password}
        onChange={handleInputChange}
      />

      {error && <p className="error-message">{error}</p>}

      <button onClick={handleLogin} className="login-button">Entrar</button>
    </div>
  );
}

export default Login;
