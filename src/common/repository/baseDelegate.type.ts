export interface BaseDelegate<Entity, CreateDto, UpdateDto> {
  findMany: () => Promise<Array<Entity>>;
  findUnique: (args: { where: { id: number } }) => Promise<Entity>;
  create: (args: { data: CreateDto }) => Promise<Entity>;
  update: (args: { data: UpdateDto; where: { id: number } }) => Promise<Entity>;
  delete: (args: { where: { id: number } }) => Promise<Entity>;
}
