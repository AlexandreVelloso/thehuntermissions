import React, { useState, useEffect } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

import './styles.css';
import NavBar from '../../components/Navbar';
import Checkbox from '../../components/Checkbox';

import api from '../../services/api';

export default function Home() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAnimals() {
            try {
                setLoading(true);
                const response = await api.get('lastMissions', {
                    headers: {
                        Authorization: token,
                    }
                });
                setLoading(false);

                setAnimals(response.data);
            } catch (err) {

            }
        }

        loadAnimals();
    }, [token]);

    async function loadAnimals() {
        try {
            const response = await api.get('lastMissions', {
                headers: {
                    Authorization: token,
                }
            });

            setAnimals(response.data);
        } catch (err) {

        }
    }

    async function updateObjective(id, completed) {
        try {
            await api.put(`objectives/${id}`, {
                completed,
            }, {
                headers: {
                    Authorization: token,
                }
            });
        }
        catch (err) {

        }
    }

    async function updateMission(id) {
        try {
            await api.put(`missions/${id}`, {
                completed: true,
            }, {
                headers: {
                    Authorization: token,
                }
            });
        }
        catch (err) {

        }
    }

    async function handleChangeObjective(id, checked) {
        setLoading(true);
        await updateObjective(id, checked);
        await loadAnimals();
        setLoading(false);
    }

    async function handleCompleteMission(id) {
        setLoading(true);
        await updateMission(id);
        await loadAnimals();
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
                    {animals.map(animal => (
                        <li key={animal.id}>
                            <div className="animal-title">
                                <h1>{animal.name}</h1>
                                <button onClick={() => handleCompleteMission(animal.mission.id)} disabled={loading}>Complete mission</button>
                            </div>
                            <div className="mission-info">
                                <strong>{animal.mission.name} - {animal.mission.reward}$gm</strong>
                            </div>
                            <ul>
                                {animal.mission.objectives.map(objective => (
                                    <li key={objective.id}>
                                        <Checkbox id={objective.id} label={objective.name} checked={objective.completed} onChange={handleChangeObjective}></Checkbox>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}