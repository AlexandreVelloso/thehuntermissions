import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
import logo from '../../assets/Logo.jpg';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            setErrorMessage('');

            setLoading(true);
            const response = await api.post('login', {
                email,
                password
            });
            setLoading(false);

            const { username } = response.data.user;
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
        <div className="login-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <img src={logo} alt="Logo"></img>
                    {
                        errorMessage &&
                        <div className="errorMessage">{errorMessage}</div>
                    }
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
                        Login
                    </button>

                    <div className="aboveLogin">
                        <Link className="back-link" to="forgot-password">
                            Forgot password
                        </Link>
                        <Link className="back-link" to="register">
                            Register
                        </Link>
                    </div>
                </form>
            </section>
        </div>
    );
}