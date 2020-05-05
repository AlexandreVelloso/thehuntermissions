import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
import logo from '../../assets/Logo.jpg';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleForgotPassword(e) {
        e.preventDefault();

        try {
            setErrorMessage('');

            setLoading(true);
            const response = await api.post('forgot-password', {
                email,
            });
            setLoading(false);
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
        <div className="forgot-password-container">
            <section className="form">
                <form onSubmit={handleForgotPassword}>
                    <img src={logo} alt="Logo"></img>
                    {
                        errorMessage &&
                        <div className="errorMessage">{errorMessage}</div>
                    }
                    <input
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button disabled={loading} className="button" type="submit">
                        Reset password
                    </button>

                    <Link className="back-link" to="login">
                        Back to login
                    </Link>
                </form>
            </section>
        </div>
    );
}