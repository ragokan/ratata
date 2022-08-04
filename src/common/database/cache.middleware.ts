import { Prisma } from "@prisma/client";
import Redis from "ioredis";

const mutation_actions = ["create", "update", "delete", "deleteMany", "updateMany"];
const query_actions = ["findUnique", "findMany", "count"];
const all_actions = [...mutation_actions, ...query_actions];

export function cache_middleware(
  redis: Redis,
  cacheDuration = 100 // 100 seconds
): Prisma.Middleware<any> {
  return async (operation, execute) => {
    const { action, model = "", args: _args = {} } = operation;
    if (!all_actions.includes(action)) return execute(operation);
    const args = JSON.stringify(_args);

    // If the action is findUnique or findMany, we read it from the cache.
    if (query_actions.includes(action)) {
      const key = `${model}:${action}:${args}`;
      const cache = await redis.get(key);
      if (cache) {
        // Update the cache expire time.
        await redis.expire(key, cacheDuration);
        return JSON.parse(cache);
      }

      const data = await execute(operation);
      await redis.set(key, JSON.stringify(data), "EX", cacheDuration);
      return data;
    }

    // If the action is create, update or delete, we firstly evaluate the method.
    const data = await execute(operation);

    if (action === "create") {
      const keys = await redis.keys(`${model}:findMany:*`);
      for (const key of keys) {
        await redis.del(key);
      }
      const keys_to_increment = await redis.keys(`${model}:count:*`);
      for (const key of keys_to_increment) {
        await redis.incr(key);
      }
    } else {
      const keys = await redis.keys(`${model}:*`);
      for (const key of keys) {
        await redis.del(key);
      }
    }
    return data;
  };
}
