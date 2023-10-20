import { RedisClientType, createClient } from 'redis'

class RedisCache {

    private prefix: string;

    private url: string;

    private connected = false;

    private readonly client: RedisClientType;

    constructor() {
        this.prefix = process.env.REDIS_PREFIX || 'test';

        this.url = `redis://${process.env.REDIS_HOST || 'localhost'}`

        this.client = createClient({ url: this.url })

        this.client.on('error', err => { this.connected = false; console.log(new Date(Date.now()), 'Error. Redis error', err) });

        this.client.on('connect', () => { this.connected = false; console.log(new Date(Date.now()), 'Info. Redis try to connect') });

        this.client.on('reconnecting', () => { this.connected = false; console.log(new Date(Date.now()), 'Info. Redis reconnecting') });

        this.client.on('ready', () => { this.connected = true; console.log(new Date(Date.now()), 'Info. Redis ready') });
    }

    public async init() {
        if (!this.connected) {
            await this.client.connect();
        }
        return this;
    }

    public async get<T>(key: string) {
        if (!this.connected) {
            throw new Error('Redis is not connected')
        }

        const result = await this.client.get(`${this.prefix}_${key}`);

        return JSON.parse(result) as T;
    }

    public async set(key: string, value: Record<string, any>) {
        if (!this.connected) {
            throw new Error('Redis is not connected')
        }

        await this.client.set(`${this.prefix}_${key}`, JSON.stringify(value));

        return value;
    }

}

export default new RedisCache();
