import type { BaseDto } from '../dto/base.dto';
import { Constructor } from '../../types';
import { Column, Model, PrimaryKey } from 'sequelize-typescript';

export interface IBaseModel<DTO extends BaseDto, O = never> {
  toDto(options?: O): DTO;
}

export abstract class BaseModel<DTO extends BaseDto = BaseDto, O = never>
  extends Model
  implements IBaseModel<DTO, O>
{
  @PrimaryKey
  @Column
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  private dtoClass?: Constructor<DTO, [BaseModel, O?]>;

  toDto(options?: O): DTO {
    const dtoClass = this.dtoClass;
    if (!dtoClass) {
      throw new Error(
        `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
      );
    }
    return new dtoClass(this, options);
  }
}
