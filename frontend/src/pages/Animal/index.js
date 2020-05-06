import React, { useState, useEffect } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import './styles.css';
import NavBar from '../../components/Navbar';
import Checkbox from '../../components/Checkbox';

import api from '../../services/api';

export default function Animal() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const history = useHistory();
    const { animalId } = useParams();

    const [animal, setAnimal] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAnimal() {
            try {
                setLoading(true);
                const response = await api.get(`animals/${animalId}`, {
                    headers: {
                        Authorization: token,
                    }
                });
                setLoading(false);

                setAnimal(verifyUserWeapons(response.data));
            } catch (err) {
                if (!err.response) {
                    alert('Error when try to connect to server');
                } else if (err.response.status === 401) {
                    history.push('/login');
                }
            }
        }

        loadAnimal();
    }, [token, history, animalId]);

    async function loadAnimal() {
        try {
            setLoading(true);
            const response = await api.get(`animals/${animalId}`, {
                headers: {
                    Authorization: token,
                }
            });
            setLoading(false);

            setAnimal(verifyUserWeapons(response.data));
        } catch (err) {
            if (!err.response) {
                alert('Error when try to connect to server');
            } else if (err.response.status === 401) {
                history.push('/login');
            }
        }
    }

    function verifyUserWeapons(animal) {
        const animalVerified = animal;

        const missions = animal.missions.map(mission => {
            const user_have_weapon = mission.objectives.every(objective => {
                return objective.weapon_id === null || (
                    objective.weapon_id !== null && objective.have_weapon !== null
                );
            });

            mission.user_have_weapon = user_have_weapon;
            return mission;
        })

        animalVerified.missions = missions;
        return animalVerified;
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
        await loadAnimal();
        setLoading(false);
    }

    function changeObjectivesCheckbox(missionId) {
        const missionsChanged = animal.missions.map((mission) => {

            if (mission.id === missionId) {
                const objectives = mission.objectives.map((objective) => {
                    objective.completed = true;
                    return objective;
                });

                mission.objectives = objectives;
            }

            return mission;
        });

        const animalChanged = {
            ...animal
        }
        animalChanged.missions = missionsChanged;
        setAnimal(animalChanged);
    }

    async function handleCompleteMission(missionId) {
        setLoading(true);
        changeObjectivesCheckbox(missionId);
        await updateMission(missionId);
        await loadAnimal();
        setLoading(false);
    }

    return (
        <div>
            <NavBar username={username}></NavBar>
            <div className="loader-icon">
                <div className={loading ? 'loading' : 'not-loading'}><FiRefreshCcw size={45}></FiRefreshCcw></div>
            </div>
            <div className="animal-container">
                <div className="animal-name">
                    <h1>{animal.name}</h1>
                </div>
                <ul>
                    {animal.missions && animal.missions.map(mission => (
                        <li key={mission.id}>
                            <p className="avaliability-tags">
                                {mission.user_have_weapon && <p className="mission-avaliability avaliable"></p>}
                                {!mission.user_have_weapon && <p className="mission-avaliability buy-gun"></p>}
                            </p>
                            <div className="mission-title">
                                <h2>{mission.name}</h2>
                                <button onClick={() => handleCompleteMission(mission.id)} disabled={loading}>Complete mission</button>
                            </div>
                            <div className="mission-info">
                                <strong>{mission.reward}$gm</strong>
                            </div>
                            <ul>
                                {mission.objectives.map(objective => (
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