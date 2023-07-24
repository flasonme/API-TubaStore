import { BaseDto } from "@common/dto/base.dto";
import type Profile from "../models/profile.model";

// TODO, remove this class and use constructor's second argument's type
export type ProfileDtoOptions = Partial<{ isActive: boolean }>;

export class ProfileDto extends BaseDto {
  user_id?: string;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  phone_number?: string;
  home_address?: string;
  work_address?: string;
  custom_address?: string;
  date_of_birth?: Date;

  constructor(profile: Profile, options?: ProfileDtoOptions) {
    super(profile);
    this.user_id = profile.user_id;
    this.first_name = profile.first_name;
    this.last_name = profile.last_name;
    this.full_name = profile.full_name;
    this.phone_number = profile.phone_number;
    this.home_address = profile.home_address;
    this.work_address = profile.work_address;
    this.custom_address = profile.custom_address;
    this.date_of_birth = profile.date_of_birth;
  }
}
