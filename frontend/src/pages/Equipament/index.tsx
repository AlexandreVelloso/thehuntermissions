import React, { useState, useEffect } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import './styles.css';
import NavBar from '../../components/Navbar';
import Checkbox from '../../components/Checkbox';

import api from '../../services/api';
import EquipamentInterface from '../../interfaces/Equipament.interface';

export default function Equipament() {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    const history = useHistory();

    const [equipaments, setEquipaments] = useState<EquipamentInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadEquipaments() {
            try {
                setLoading(true);
                const response = await api.get('equipaments', {
                    headers: {
                        Authorization: token,
                    }
                });
                setLoading(false);

                setEquipaments(response.data);

            } catch (err) {
                if (!err.response || err.response.status === 401) {
                    // history.push('/login');
                }
            }
        }
        loadEquipaments();
    }, [token, history]);

    async function loadEquipaments() {
        try {
            const response = await api.get('equipaments', {
                headers: {
                    Authorization: token,
                }
            });

            setEquipaments(response.data);
        } catch (err) {

        }
    }

    async function updateEquipament(missionId: number, checked: boolean) {
        try {
            await api.put(`equipaments/${missionId}`, {
                have_equipament: checked,
            }, {
                headers: {
                    Authorization: token,
                }
            });
        }
        catch (err) {

        }
    }

    async function handleChangeEquipament(objectiveId: number, checked: boolean) {
        setLoading(true);
        await updateEquipament(objectiveId, checked);
        await loadEquipaments();
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
                    {equipaments.map(equipament => (
                        <li key={equipament.id}>
                            <div className="animal-title">
                                <Checkbox id={equipament.id} label={equipament.name} checked={equipament.have_equipament} onChange={handleChangeEquipament}></Checkbox>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}