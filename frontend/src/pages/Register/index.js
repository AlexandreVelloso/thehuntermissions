import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
import logo from '../../assets/Logo.jpg';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        try {
            setErrorMessage('');

            setLoading(true);
            const response = await api.post('auth/register', {
                username,
                email,
                password
            });
            setLoading(false);

            const token = response.data.accessToken;

            localStorage.setItem('token', token);
            localStorage.setItem('username', username);

            history.push('/');
        } catch (err) {
            setLoading(false);
            if (!err.response) {
                setErrorMessage('Error when try to connect to server')
            } else {
                setErrorMessage(err.response.data.error);
            }
        }
    }

    return (
        <div className="register-container">
            <section className="form">
                <form onSubmit={handleRegister}>
                    <img src={logo} alt="Logo"></img>
                    {
                        errorMessage &&
                        <div className="errorMessage">{errorMessage}</div>
                    }
                    <input
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        placeholder="E-mail"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button disabled={loading} className="button" type="submit">
                        Entrar
                    </button>

                    <Link className="back-link" to="login">
                        Voltar para o login
                    </Link>
                </form>
            </section>
        </div>
    );
}