import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import type { IProfile } from '../interfaces/profile.interface';
import { BaseModel } from '@common/base/base.model';
import { UseDto } from '@decorators/use-dto.decorator';
import User from '@modules/user/models/user.model';
import { ProfileDto } from '@modules/user/sub_modules/profile/dtos/profile.dto';
import { DEFAULT_AVATAR } from '@modules/user/sub_modules/profile/consts/profile.const';

@UseDto(ProfileDto)
@Table({
  tableName: 'profiles',
  timestamps: false,
})
export default class Profile extends BaseModel<ProfileDto> implements IProfile {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  user_id: string;

  @Default(DEFAULT_AVATAR)
  @Column
  avatar: string;

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column(DataType.VIRTUAL)
  get full_name(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  @Column
  phone_number: string;

  @Column
  home_address: string;

  @Column
  work_address: string;

  @Column
  custom_address: string;

  @Column(DataType.DATEONLY)
  date_of_birth: Date;

  @BelongsTo(() => User)
  user: User;
}
