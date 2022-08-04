import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FileService } from "src/common/file/file.service";
import { FileDto } from "src/common/guards/multipart/example-file.dto";
import { Upload } from "src/common/guards/multipart/upload.guard";
import { AppService } from "./app.service";

@ApiTags("App")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private fileService: FileService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post("upload")
  @Upload()
  async uploadFile(@Body() fileDto: FileDto): Promise<string> {
    await this.fileService.uploadFile(fileDto.file);
    await this.fileService.uploadFile(fileDto.fileTwo);
    console.log(fileDto.extraField);

    return "Ok!";
  }
}
