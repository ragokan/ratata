import { Injectable, OnModuleInit, INestApplication } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";
import { cache_middleware } from "src/common/database/cache.middleware";

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    this.$use(cache_middleware(new Redis()));
  }

  async onModuleInit() {
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", app.close);
  }
}
