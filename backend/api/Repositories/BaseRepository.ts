interface BaseRepository<T> {

    findById(id: number): Promise<T>;

}

export default BaseRepository;