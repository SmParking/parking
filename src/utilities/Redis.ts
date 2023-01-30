import { createClient } from "redis";

class RedisClient {
  client: any;

  constructor() {
    this.client = createClient();
    this.client.connect();
  }

  // set redis key
  set = async (key: string, value: any) => {
    await this.client.set(key, value);
  };

  // get redis key
  get = async (key: string) => {
    return await this.client.get(key);
  };

  // disconnect redis
  disconnect = async () => {
    await this.client.disconnect();
  };
}

export const Redis = new RedisClient();
