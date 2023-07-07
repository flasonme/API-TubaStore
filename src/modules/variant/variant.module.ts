import { Module } from '@nestjs/common';
import Variant from '@modules/variant/models/variant.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { VariantController } from '@modules/variant/controllers/variant.controller';
import { VariantService } from '@modules/variant/services/variant.service';

@Module({
  imports: [SequelizeModule.forFeature([Variant])],
  controllers: [VariantController],
  exports: [VariantService],
  providers: [VariantService],
})
export class VariantModule {}
