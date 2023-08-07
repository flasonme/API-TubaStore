import {
  AllowNull,
  BeforeCreate,
  Column,
  CreatedAt,
  DataType,
  Default,
  DefaultScope,
  DeletedAt,
  HasOne,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

import { RoleType } from '../../../constants';
import type { IUser } from '../interfaces/user.interface';
import { generateHash } from '@common/utils';
import { BaseModel } from '@common/base/base.model';
import { UseDto } from '@decorators/use-dto.decorator';
import { UserDto } from '@modules/user/dtos/user.dto';
import Profile from '@modules/user/sub_modules/profile/models/profile.model';

@UseDto(UserDto)
@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
@DefaultScope(() => ({
  include: ['profile'],
}))
export default class User extends BaseModel<UserDto> implements IUser {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Unique
  @AllowNull(false)
  @Column
  email: string;

  @Column
  password: string;

  @AllowNull(false)
  @Default(RoleType.USER)
  @Column
  role: RoleType;

  @CreatedAt
  created_at: Date;
  @UpdatedAt
  updated_at: Date;
  @DeletedAt
  deleted_at: Date;

  @BeforeCreate
  static async hashPassword(instance: User): Promise<void> {
    instance.password = await generateHash(instance.password);
  }

  @HasOne(() => Profile)
  profile: Profile;
}
