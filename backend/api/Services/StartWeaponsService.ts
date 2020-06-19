interface StartWeaponsService {

    addWeapons(userId: number): Promise<void>;

}

export default StartWeaponsService;