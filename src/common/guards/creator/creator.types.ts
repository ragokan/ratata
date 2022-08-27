import { PrismaClient } from "@prisma/client";

type ModelKeys = Pick<PrismaClient, Exclude<keyof PrismaClient, `$${string}`>>;

export type CreatorPayload = {
  model: keyof ModelKeys;
  userIdKey?: string;
};
