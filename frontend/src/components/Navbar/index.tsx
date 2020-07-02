import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom'

import './styles.css';

import logo from '../../assets/Logo.jpg';

export default function MyNavBar({ username }: { username: string | null }) {
    const history = useHistory();

    async function handleLogout() {
        localStorage.clear();
        history.push('/login');
    }

    return (
        <div className="topnav">
            <Link className="" to="/"><img className="image-link" src={logo} alt="Logo"></img></Link>
            <Link className="menuLink" to="/">Home</Link>
            <Link className="menuLink" to="/weapon">Weapon</Link>
            <Link className="menuLink" to="/equipament">Equipament</Link>

            <div className="user-info">
                Welcome <Link to="/">{username}</Link>
                <button onClick={handleLogout}>
                    <FiPower size={25} className="logout-icon" color="#fff" />
                    Logout
                </button>
            </div>
        </div>
    );
}