import React, { useState, useEffect } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import Select from 'react-select';

import './styles.css';
import NavBar from '../../components/Navbar';
import Checkbox from '../../components/Checkbox';

import api from '../../services/api';
import Animal from '../../interfaces/Animal.interface';
import Weapon from '../../interfaces/Weapon.interface';

interface OptionInterface {
    value: number,
    label: string,
}

export default function Search() {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    const [loading, setLoading] = useState(true);

    const [animals, setAnimals] = useState<Animal[]>([]);
    const [animalsOptions, setAnimalsOptions] = useState<OptionInterface[]>([]);
    const [weaponsOptions, setWeaponsOptions] = useState<OptionInterface[]>([]);

    const [animalsFiltered, setAnimalsFiltered] = useState<Animal[]>([]);
    const [selectedAnimals, setSelectedAnimals] = useState<OptionInterface[]>([]);
    const [selectedWeapons, setSelectedWeapons] = useState<OptionInterface[]>([]);

    useEffect(() => {
        async function firstLoad() {
            try {
                setLoading(true);
                Promise.all([
                    await loadAnimals(),
                    await loadWeapons(),
                ]);
            } catch (err) {

            } finally {
                setLoading(false);
            }
        }

        firstLoad();
    }, [token]);

    async function loadAnimals(): Promise<Animal[]> {
        const response = await api.get('animals', {
            headers: {
                Authorization: token,
            }
        });

        const options = toOptions(response.data);
        setAnimalsOptions(options);

        setAnimals(response.data);
        setAnimalsFiltered(response.data);

        return response.data;
    }

    async function loadWeapons(): Promise<Weapon[]> {
        const response = await api.get('weapons', {
            headers: {
                Authorization: token,
            }
        });

        const options = toOptions(response.data);
        setWeaponsOptions(options);

        return response.data;
    }

    function toOptions(array: any[]): any[] {
        const options: OptionInterface[] = array.map(arrayElement => {
            return {
                value: arrayElement.id,
                label: arrayElement.name
            }
        });

        return options;
    }

    function handleSelectedAnimalsChanged(selected: any): void {
        setSelectedAnimals(selected);
    }

    function handleSelectedWeaponsChanged(selected: any): void {
        setSelectedWeapons(selected);
    }

    function filterAnimals(animalsArray: any[]): any[] {
        return animalsArray.filter(animal => {
            if (!selectedAnimals || selectedAnimals.length === 0) {
                return true;
            }

            const isAnimalInFilter = selectedAnimals.some(selectedAnimal => {
                if (!selectedAnimal) {
                    return false;
                }

                return selectedAnimal.value === animal.id;
            });

            return isAnimalInFilter;
        });
    }

    function filterWeapons(animalsArray: Animal[]): void {
        animalsArray.forEach(animal => {
            animal.missions = animal.missions.filter(mission => {
                console.log(selectedWeapons);
                if (!selectedWeapons || selectedWeapons.length === 0) {
                    return true;
                }

                const isMissionInFilter = selectedWeapons.some(selectedWeapon => {
                    if (!selectedWeapon) {
                        return false;
                    }

                    return mission.objectives.some(
                        objective => objective.weapons.some(
                            weapon => weapon.id === selectedWeapon.value));
                });

                return isMissionInFilter;
            });
        });
    }

    function handleSearch() {
        const animalsFilteredResult = filterAnimals(animals);
        filterWeapons(animalsFilteredResult);

        setAnimalsFiltered(animalsFilteredResult);
    }

    return (
        <div>
            <NavBar username={username}></NavBar>
            <div className="home-container">
                <div className="filter-container">
                    <div>
                        <label htmlFor="animal-name">
                            Animal(s)
                    </label>
                        <Select
                            isMulti
                            name="animals"
                            value={selectedAnimals}
                            options={animalsOptions}
                            onChange={handleSelectedAnimalsChanged}
                        />
                    </div>
                    <div>
                        <label htmlFor="animal-name">
                            Weapon(s)
                    </label>
                        <Select
                            isMulti
                            name="weapons"
                            options={weaponsOptions}
                            onChange={handleSelectedWeaponsChanged}
                        />
                    </div>
                    <div>
                        <button
                            onClick={() => handleSearch()}
                            disabled={loading}>
                            Search
                        </button>
                    </div>
                </div>
                <div className="loader-icon">
                    <div className={loading ? 'loading' : 'not-loading'}><FiRefreshCcw size={45}></FiRefreshCcw></div>
                </div>
                <ul>
                    {
                        animalsFiltered.map(animal =>
                            animal.missions.map(mission => (
                                <li key={`${animal.id}_${mission.id}`}>
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
                                    <div className="mission-info">
                                        <h1>{animal.name}</h1>
                                        <strong>{mission.name} - {mission.reward}$gm</strong>
                                    </div>
                                    <ul>
                                        {mission.objectives.map(objective => (
                                            <li key={objective.id}>
                                                <Checkbox id={objective.id} label={objective.name} checked={objective.completed} onChange={() => { }}></Checkbox>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))
                        )
                    }
                </ul>
            </div>
        </div >
    );
}