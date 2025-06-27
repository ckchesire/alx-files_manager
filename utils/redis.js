import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.connected = false;

    this._isReady = new Promise((resolve) => {
      this.client.on('connect', () => {
        this.connected = true;
        resolve(true);
      });
    });

    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    await this._isReady;
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) return reject(err);
        resolve(reply);
      });
    });
  }

  async set(key, value, duration) {
    await this._isReady;
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
  }

  async del(key) {
    await this._isReady;
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
