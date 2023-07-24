import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Profile from '@modules/user/sub_modules/profile/models/profile.model';
import { ProfileService } from '@modules/user/sub_modules/profile/services/profile.service';
import { ProfileController } from '@modules/user/sub_modules/profile/controllers/profile.controller';

@Module({
  imports: [SequelizeModule.forFeature([Profile])],
  controllers: [ProfileController],
  exports: [ProfileService],
  providers: [ProfileService],
})
export class ProfileModule {}
