import Mission from "./Mission";

export default interface LastMission {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    mission: Mission;
}