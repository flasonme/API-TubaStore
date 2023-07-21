export interface IFile {
  encoding: string;
  buffer: Buffer;
  fieldName: string;
  filename: string;
  mimetype: string;
  originalName: string;
  size: number;
}

export interface IUploadConfig {
  path: string;
  url: string;
  ext: string[];
  limit: number;
}
