export interface AppFile {
  filename: string;
  data: Buffer;
  encoding: string;
  mimetype: string;
  limit: boolean;
}
