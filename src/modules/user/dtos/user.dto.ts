import { BaseDto } from "@common/dto/base.dto";
import { RoleType } from "../../../constants";
import type User from "../models/user.model";

// TODO, remove this class and use constructor's second argument's type
export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserDto extends BaseDto {
  role: RoleType;

  email: string;

  constructor(user: User, options?: UserDtoOptions) {
    super(user);
    this.role = user.role;
    this.email = user.email;
  }
}
