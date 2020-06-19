import AnimalModel from "../../database/models/AnimalModel";

interface AnimalService {

    index(userId: number): Promise<AnimalModel[]>;

    get(animalId: number, userId: number): Promise<AnimalModel>;

}

export default AnimalService;