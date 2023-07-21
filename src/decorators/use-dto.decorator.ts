import type { BaseModel } from '@common/base/base.model';
import type { BaseDto } from '@common/dto/base.dto';
import type { Constructor } from '../types';

export function UseDto(
  dtoClass: Constructor<BaseDto, [BaseModel, unknown]>,
): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
