import { BaseDto } from "@common/dto/base.dto";
import { RoleType } from "../../../constants";
import type User from "../models/user.model";
import { ProfileDto } from "@modules/user/sub_modules/profile/dtos/profile.dto";

// TODO, remove this class and use constructor's second argument's type
export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserDto extends BaseDto {
  email: string;

  role: RoleType;

  profile?: ProfileDto;

  constructor(user: User, options?: UserDtoOptions) {
    super(user);
    this.role = user.role;
    this.email = user.email;
    this.profile = user.profile?.toDto();
  }
}
