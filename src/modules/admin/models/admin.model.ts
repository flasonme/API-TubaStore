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
import type { IAdministrator } from '../interfaces/admin.interface';
import { generateHash } from '@common/utils';
import { BaseModel } from '@common/base/base.model';
import { UseDto } from '@decorators/use-dto.decorator';
import { AdministratorDto } from '@modules/admin/dtos/admin.dto';

@UseDto(AdministratorDto)
@Table({
  tableName: 'administrators',
  timestamps: true,
  paranoid: true,
})
export default class Administrator
  extends BaseModel<AdministratorDto>
  implements IAdministrator
{
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

  @CreatedAt
  created_at: Date;
  @UpdatedAt
  updated_at: Date;
  @DeletedAt
  deleted_at: Date;

  @BeforeCreate
  static async hashPassword(instance: Administrator): Promise<void> {
    instance.password = await generateHash(instance.password);
  }
}
