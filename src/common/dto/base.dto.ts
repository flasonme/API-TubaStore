import type { BaseModel } from '../base/base.model';
import { MakeNullishOptional } from 'sequelize/types/utils';

export class BaseDto implements MakeNullishOptional<BaseModel> {
  id?: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(model: BaseModel, options?: { excludeFields?: boolean }) {
    this.id = model.id;
    this.created_at = model.created_at;
    this.updated_at = model.updated_at;
    if (options?.excludeFields) {
      delete this.id;
      delete this.created_at;
      delete this.updated_at;
    }
  }
}
