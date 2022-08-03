import { BaseDelegate } from "src/common/repository/baseDelegate.type";
import { BaseEntity } from "../database/entity/base.entity";

type WithoutRelationships<T extends BaseEntity> = {
  [P in keyof T as T[P] extends object ? (T[P] extends Date ? P : never) : P]: T[P];
};

export abstract class BaseRepository<Entity extends BaseEntity, CreateDto, UpdateDto> {
  constructor(private delegate: BaseDelegate<Entity, CreateDto, UpdateDto>) {}

  /* START: Read Data */
  public findMany(): Promise<Array<WithoutRelationships<Entity>>> {
    return this.delegate.findMany();
  }

  public findOne(id: number): Promise<WithoutRelationships<Entity>> {
    return this.delegate.findUnique({ where: { id } });
  }
  /* END: Read Data */

  /* START: Write Data */
  async create(dto: CreateDto): Promise<WithoutRelationships<Entity>> {
    return this.delegate.create({ data: dto });
  }

  async update(id: number, dto: UpdateDto): Promise<WithoutRelationships<Entity>> {
    return this.delegate.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
  /* END: Write Data */
}
