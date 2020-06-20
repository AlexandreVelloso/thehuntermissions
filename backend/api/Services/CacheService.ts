import { Key } from "node-cache";

interface CacheService {
    get(key: Key, storeFuncion: any): Promise<any>;

    del(keys: Key | Key[]): number;

    delByUserId(userId: number): void;

    flush(): void;
}

export default CacheService;