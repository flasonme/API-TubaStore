import { Injectable } from '@nestjs/common';
import User from '../models/user.model';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { UserDto } from '@modules/user/dtos/user.dto';
import { BaseService } from '@common/base/base.service';
import { InjectModel } from '@nestjs/sequelize';
import { Repository, Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { ProfileService } from '@modules/user/sub_modules/profile/services/profile.service';

@Injectable()
export class UserService extends BaseService<User, UserDto> {
  constructor(
    @InjectModel(User)
    private userRepo: Repository<User>,
    private _sequelize: Sequelize,
    private _profileService: ProfileService,
  ) {
    super(userRepo);
  }

  async create(userRegisterDto: UserRegisterDto): Promise<UserDto> {
    const transaction: Transaction = await this._sequelize.transaction();
    try {
      const user = await this._repository.create(
        { ...userRegisterDto },
        { transaction },
      );
      await this._profileService.transactionalCreate(user.id, transaction);
      await transaction.commit();
      return user.toDto();
    } catch (error) {
      await transaction.rollback();
      // TODO: Create DatabaseExceptionFilter
      throw error;
    }
  }

  // async getMany(
  //   pageOptionsDto: UsersPageOptionsDto,
  // ): Promise<PageDto<UserDto>> {
  //   const options: FindOptions<User> = {
  //     where: {},
  //     limit: 10,
  //     offset: 0,
  //     order: [],
  //     include: [],
  //   };
  //
  //   for (const key in pageOptionsDto) {
  //     if (!pageOptionsDto[key]) {
  //       continue;
  //     }
  //     switch (key) {
  //       case 'order':
  //       case 'page':
  //         break;
  //       case 'limit':
  //         options.limit = pageOptionsDto.limit;
  //         options.offset = (pageOptionsDto.page - 1) * pageOptionsDto.limit;
  //         break;
  //       default:
  //         options.where[key] = pageOptionsDto[key];
  //     }
  //   }
  //
  //   const users = await this._repository.findAll(options);
  //
  //   const pageMeta = new PageMetaDto({
  //     pageOptionsDto: pageOptionsDto,
  //     itemCount: users.length,
  //   });
  //
  //   return new PageDto<UserDto>(users, pageMeta);
  // }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this._repository.findOne({ where: { email } });
  }
}
