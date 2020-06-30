import Mission from './Mission.interface';

interface Animal {
    id: number,
    name: string,
    missions: Mission[],
    created_at: string,
    updated_at: string,
}

export default Animal;
