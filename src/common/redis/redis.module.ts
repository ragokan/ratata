import { DynamicModule, Module } from "@nestjs/common";
import { RedisService } from "./redis.service";

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: RedisModule,
      providers: [RedisService],
    };
  }
}
