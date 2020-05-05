import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
import logo from '../../assets/Logo.jpg';

export default function ResetPassword({ resetToken }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const query = useQuery();
    const token = query.get('resetToken');

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    async function handleResetPassword(e) {
        e.preventDefault();

        try {
            if (!token || !password || !confirmPassword) {
                return;
            }

            if(password !== confirmPassword){
                setErrorMessage('The passwords doesn\'t match');
                return;
            }

            setErrorMessage('');
            setLoading(true);

            await api.post('resetPassword', {
                token,
                password,
                confirmPassword
            });

            setSuccessMessage('Password updated')
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
        <div className="reset-password-container">
            <section className="form">
                <form onSubmit={handleResetPassword}>
                    <img src={logo} alt="Logo"></img>
                    {
                        errorMessage &&
                        <div className="errorMessage">{errorMessage}</div>
                    }
                    {
                        successMessage &&
                        <div className="successMessage">{successMessage}</div>
                    }
                    <input
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <input
                        placeholder="Confirm Password"
                        onChange={e => setConfirmPassword(e.target.value)}
                        type="password"
                    />
                    <button disabled={loading} className="button" type="submit">
                        Update password
                    </button>

                    <Link className="back-link" to="login">
                        Back to login
                    </Link>
                </form>
            </section>
        </div>
    );
}