import React, { useState, useEffect } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import NavBar from '../../components/Navbar';
import Checkbox from '../../components/Checkbox';

import api from '../../services/api';

export default function Home() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const history = useHistory();

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

                setAnimals(verifyUserWeapons(response.data));
            } catch (err) {
                if (!err.response || err.response.status === 401) {
                    history.push('/login');
                }
            }
        }
        loadAnimals();
    }, [token, history]);

    async function loadAnimals() {
        try {
            const response = await api.get('lastMissions', {
                headers: {
                    Authorization: token,
                }
            });

            setAnimals(verifyUserWeapons(response.data));
        } catch (err) {

        }
    }

    function verifyUserWeapons(animals) {
        const animalsVerified = animals.map(animal => {
            const user_have_weapon = animal.mission.objectives.every(objective => {
                return objective.weapon_id === null || (
                    objective.weapon_id !== null && objective.have_weapon !== null
                );
            });

            animal.mission.user_have_weapon = user_have_weapon;

            return animal;
        });

        return animalsVerified;
    }

    async function updateObjective(objectiveId, completed) {
        try {
            await api.put(`objectives/${objectiveId}`, {
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

    async function updateMission(missionId) {
        try {
            await api.put(`missions/${missionId}`, {
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

    async function handleChangeObjective(objectiveId, checked) {
        setLoading(true);
        await updateObjective(objectiveId, checked);
        await loadAnimals();
        setLoading(false);
    }

    function changeObjectivesCheckbox(missionId) {
        const animalsChanged = animals.map((animal) => {

            if (animal.mission.id === missionId) {
                const objectives = animal.mission.objectives.map((objective) => {
                    objective.completed = true;
                    return objective;
                });

                animal.objectives = objectives;
            }

            return animal;
        });

        setAnimals(animalsChanged);
    }

    async function handleCompleteMission(missionId) {
        setLoading(true);
        changeObjectivesCheckbox(missionId);
        await updateMission(missionId);
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
                            <p className="avaliability-tags">
                                {animal.mission.user_have_weapon && <p className="mission-avaliability avaliable"></p>}
                                {!animal.mission.user_have_weapon && <p className="mission-avaliability buy-gun"></p>}
                            </p>
                            <div className="animal-title">
                                <Link to={`animal/${animal.id}`}><h1>{animal.name}</h1></Link>
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