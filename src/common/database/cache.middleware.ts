import { Prisma } from "@prisma/client";
import Redis from "ioredis";

const mutationActions = ["create", "update", "delete", "deleteMany", "updateMany"];
const queryActions = ["findUnique", "findMany", "count"];
const allActions = [...mutationActions, ...queryActions];

export function cacheMiddleware(
  redis: Redis,
  cacheDuration = 100 // 100 seconds
): Prisma.Middleware<any> {
  return async (operation, execute) => {
    const { action, model = "", args: _args = {} } = operation;
    if (!allActions.includes(action)) return execute(operation);
    const args = JSON.stringify(_args);

    // If the action is findUnique or findMany, we read it from the cache.
    if (queryActions.includes(action)) {
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
      const keysToIncrement = await redis.keys(`${model}:count:*`);
      for (const key of keysToIncrement) {
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
