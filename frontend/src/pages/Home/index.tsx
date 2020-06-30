import React, { useState, useEffect } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import NavBar from '../../components/Navbar';
import Checkbox from '../../components/Checkbox';
import LastMission from '../../interfaces/LastMission.interface';
import Objective from '../../interfaces/Objective.interface';

import api from '../../services/api';

export default function Home() {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    const history = useHistory();

    const [animals, setAnimals] = useState<LastMission[]>([]);
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
                if (!err.response) {
                    alert('Error when try to connect to server');
                } else if (err.response.status === 401) {
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

            setAnimals(response.data);
        } catch (err) {

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
        await loadAnimals();
        setLoading(false);
    }

    function changeObjectivesCheckbox(missionId: number) {
        const animalsChanged: LastMission[] = animals.map((animal: LastMission) => {

            if (animal.mission.id === missionId) {
                const objectives: Objective[] = animal.mission.objectives.map((objective: Objective) => {
                    objective.completed = true;
                    return objective;
                });

                animal.mission.objectives = objectives;
            }

            return animal;
        });

        setAnimals(animalsChanged);
    }

    async function handleCompleteMission(missionId: number) {
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
                            <span className="avaliability-tags">
                                {animal.mission.user_has_weapon && <p className="mission-avaliability avaliable"></p>}
                                {!animal.mission.user_has_weapon && <p className="mission-avaliability buy-gun"></p>}
                            </span>
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