import {
  AllowNull,
  BeforeCreate,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
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

@UseDto(UserDto)
@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
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

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Default('some-avatar.png')
  @Column
  avatar: string;
  @CreatedAt
  created_at: Date;
  @UpdatedAt
  updated_at: Date;
  @DeletedAt
  deleted_at: Date;

  @Column(DataType.VIRTUAL)
  get full_name(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  @BeforeCreate
  static async hashPassword(instance: User): Promise<void> {
    instance.password = await generateHash(instance.password);
  }
}
