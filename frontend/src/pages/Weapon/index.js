import React, { useState, useEffect } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import './styles.css';
import NavBar from '../../components/Navbar';
import Checkbox from '../../components/Checkbox';

import api from '../../services/api';

export default function Weapon() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const history = useHistory();

    const [weapons, setWeapons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadWeapons() {
            try {
                setLoading(true);
                const response = await api.get('weapons', {
                    headers: {
                        Authorization: token,
                    }
                });
                setLoading(false);

                setWeapons(response.data);
            console.log(response.data)

            } catch (err) {
                if (!err.response || err.response.status === 401) {
                    // history.push('/login');
                }
            }
        }
        loadWeapons();
    }, [token, history]);

    async function loadWeapons() {
        try {
            const response = await api.get('weapons', {
                headers: {
                    Authorization: token,
                }
            });

            setWeapons(response.data);
        } catch (err) {

        }
    }

    async function updateWeapon(missionId, checked) {
        try {
            await api.put(`weapons/${missionId}`, {
                have_weapon: checked,
            }, {
                headers: {
                    Authorization: token,
                }
            });
        }
        catch (err) {

        }
    }

    async function handleChangeWeapon(objectiveId, checked) {
        setLoading(true);
        await updateWeapon(objectiveId, checked);
        await loadWeapons();
        setLoading(false);
    }

    return (
        <div>
            <NavBar username={username}></NavBar>
            <div className="loader-icon">
                <div className={loading ? 'loading' : 'not-loading'}><FiRefreshCcw size={45}></FiRefreshCcw></div>
            </div>
            <div className="home-container">
                <ul>
                    {weapons.map(weapon=>(
                        <li key={weapon.id}>
                            <div className="animal-title">
                                <Checkbox id={weapon.id} label={weapon.name} checked={weapon.have_weapon} onChange={handleChangeWeapon}></Checkbox>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}