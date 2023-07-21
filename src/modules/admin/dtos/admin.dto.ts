import { BaseDto } from "@common/dto/base.dto";
import type Administrator from "../models/admin.model";

// TODO, remove this class and use constructor's second argument's type
export type AdministratorDtoOptions = Partial<{ isActive: boolean }>;

export class AdministratorDto extends BaseDto {
  email: string;

  constructor(admin: Administrator, options?: AdministratorDtoOptions) {
    super(admin);
    this.email = admin.email;
  }
}
