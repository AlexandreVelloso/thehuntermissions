import NodeCache, { Key } from 'node-cache';

import CacheService from "../CacheService";

class CacheServiceImpl implements CacheService {

    private cache: NodeCache;

    public constructor(opts: any) {
        this.cache = new NodeCache({
            stdTTL: opts.ttlSeconds,
            checkperiod: opts.ttlSeconds * 0.2,
            useClones: false
        });
    }

    async get(key: Key, storeFuncion: any): Promise<any> {
        const value = this.cache.get(key);

        if (value) {
            return Promise.resolve(value);
        }

        const result = await storeFuncion();

        this.cache.set(key, result);

        return result;
    }

    del(keys: Key | Key[]): number {
        return this.cache.del(keys);
    }

    delByUserId(userId: number): void {
        if (userId <= 0) {
            return;
        }

        const pattern = `.+_${userId}$`;
        const re = new RegExp(pattern);

        const keys = this.cache.keys();

        for (const key of keys) {
            if (re.test(key)) {
                this.del(key);
            }
        }
    }

    flush(): void {
        this.cache.flushAll();
    }

}

export default CacheServiceImpl;