import BaseRepository from "./BaseRepository";
import AnimalModel from "../../database/models/AnimalModel";

interface AnimalRepository extends BaseRepository<AnimalModel> {

    getAnimalsByUser(userId: any): Promise<AnimalModel[]>;

    findAnimalByUser(animalId: number, userId: any): Promise<AnimalModel>;

}

export default AnimalRepository;