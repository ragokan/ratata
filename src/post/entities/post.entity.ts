import { MinLength } from "class-validator";
import { BaseEntity } from "src/common/database/entity/base.entity";

export class PostEntity extends BaseEntity {
  @MinLength(5, { message: "Min length cannot be shorter than 5 letters." })
  title: string;
}
