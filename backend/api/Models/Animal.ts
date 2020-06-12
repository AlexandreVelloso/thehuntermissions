import Mission from "./Mission";

export default interface Animal {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    missions: Mission[];
}