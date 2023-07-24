import { Injectable } from '@nestjs/common';
import Profile from '../models/profile.model';
import { BaseService } from '@common/base/base.service';
import { InjectModel } from '@nestjs/sequelize';
import { ProfileDto } from '@modules/user/sub_modules/profile/dtos/profile.dto';
import { Repository } from 'sequelize-typescript';
import { Transaction } from 'sequelize/types';
import { UpdateProfileDto } from '@modules/user/sub_modules/profile/dtos/update-profile.dto';

@Injectable()
export class ProfileService extends BaseService<Profile, ProfileDto> {
  constructor(
    @InjectModel(Profile)
    private profileRepo: Repository<Profile>,
  ) {
    super(profileRepo);
  }

  async transactionalCreate(
    user_id: string,
    transaction: Transaction,
  ): Promise<ProfileDto> {
    const result = await this._repository.create<Profile>(
      { user_id },
      { transaction },
    );
    return result?.toDto();
  }

  async transactionalDelete(user_id: string, transaction: Transaction) {
    return await this._repository.destroy({
      where: { user_id },
      transaction,
    });
  }

  async update(user_id: string, data: UpdateProfileDto): Promise<ProfileDto> {
    await this._repository.update(data, { where: { user_id } });
    const result = await this._repository.findByPk(user_id);
    return result.toDto();
  }
}
