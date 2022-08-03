import { DynamicModule, Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      providers: [DatabaseService],
    };
  }
}
