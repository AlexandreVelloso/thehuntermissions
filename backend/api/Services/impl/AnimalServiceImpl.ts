import AnimalModel from '../../../database/models/AnimalModel';
import EntityNotFoundException from '../../Exceptions/EntityNotFoundException';
import AnimalRepository from '../../Repositories/AnimalRepository';
import AnimalService from '../AnimalService';
import AnimalDto from '../../Dtos/AnimalDto';

class AnimalServiceImpl implements AnimalService {

    private animalRepository: AnimalRepository;

    public constructor(animalRepository: AnimalRepository) {
        this.animalRepository = animalRepository;
    }

    async index(userId: number): Promise<AnimalDto[]> {
        const animals: AnimalModel[] = await this.animalRepository
            .getAnimalsByUser(userId);

        const animalsDtos: AnimalDto[] = AnimalDto.toDto(animals);

        return animalsDtos;
    }

    async get(animalId: number, userId: any): Promise<AnimalDto> {
        const animal: AnimalModel = await this.animalRepository
            .findAnimalByUser(animalId, userId);

        if (!animal) {
            throw new EntityNotFoundException('Animal not found');
        }

        const animalDto = AnimalDto.toDto(animal);

        return animalDto;
    }
}

export default AnimalServiceImpl;
