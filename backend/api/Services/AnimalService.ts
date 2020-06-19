import AnimalDto from "../Dtos/AnimalDto";

interface AnimalService {

    index(userId: number): Promise<AnimalDto[]>;

    get(animalId: number, userId: number): Promise<AnimalDto>;

}

export default AnimalService;