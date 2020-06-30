import Mission from './Mission.interface';

interface LastMission {
    id: number,
    name: string,
    mission: Mission,
    created_at: string,
    updated_at: string,
}

export default LastMission;
