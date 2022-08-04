import { ApiProperty } from "@nestjs/swagger";
import { AppFile } from "src/common/types/app-file";

export class FileDto {
  @ApiProperty({ type: "string", format: "binary" })
  file: AppFile;

  @ApiProperty({ type: "string", format: "binary" })
  fileTwo: AppFile;

  extraField: string;
}
