import { Injectable } from '@nestjs/common';
import { MODULE_UPLOAD } from '@constants/file.const';
import { IUploadConfig } from '@interfaces/file.interface';

@Injectable()
export class FilesService {
  getUploadConfig(fieldName: string): IUploadConfig {
    const config = MODULE_UPLOAD;
    if (config[fieldName] != undefined) {
      return config[fieldName];
    }
    return config['default'];
  }
}
