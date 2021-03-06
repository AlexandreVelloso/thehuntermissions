import React, { useState, useEffect } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import './styles.css';
import NavBar from '../../components/Navbar';
import Checkbox from '../../components/Checkbox';
import AnimalInterface from '../../interfaces/Animal.interface';

import api from '../../services/api';

export default function Animal() {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    const history = useHistory();
    const { animalId } = useParams();

    const [animal, setAnimal] = useState<AnimalInterface>({
        id: 0,
        name: '',
        missions: [],
        created_at: '',
        updated_at: ''
    });
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
                setAnimal(response.data);
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
            setAnimal(response.data);
        } catch (err) {
            if (!err.response) {
                alert('Error when try to connect to server');
            } else if (err.response.status === 401) {
                history.push('/login');
            }
        }
    }

    async function updateObjective(objectiveId: number, completed: boolean) {
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

    async function updateMission(missionId: number) {
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

    async function handleChangeObjective(objectiveId: number, checked: boolean) {
        setLoading(true);
        await updateObjective(objectiveId, checked);
        await loadAnimal();
        setLoading(false);
    }

    function changeObjectivesCheckbox(missionId: number) {
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

    async function handleCompleteMission(missionId: number) {
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
                            <span className="avaliability-tags">
                                {
                                    (
                                        mission.user_has_equipament &&
                                        mission.user_has_weapon
                                    )
                                    &&
                                    <p className="mission-avaliability avaliable"></p>
                                }
                                {!mission.user_has_weapon && <p className="mission-avaliability buy-gun"></p>}
                                {!mission.user_has_equipament && <p className="mission-avaliability buy-equipament"></p>}
                            </span>
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