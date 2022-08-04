import { DynamicModule, Module } from "@nestjs/common";
import { FileService } from "./file.service";

@Module({
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: FileModule,
      providers: [FileService],
    };
  }
}
