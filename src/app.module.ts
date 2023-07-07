import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { ApiConfigService } from '@shared/services/api-config.service';
import { SharedModule } from '@shared/shared.module';
import { AppController } from './app.controller';
import { UserModule } from '@modules/user/user.module';
import { ProductModule } from '@modules/product/product.module';
import { VariantModule } from '@modules/variant/variant.module';
import { CartModule } from '@modules/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    SequelizeModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.postgresConfig,
      inject: [ApiConfigService],
    }),
    SharedModule,
    UserModule,
    ProductModule,
    VariantModule,
    CartModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
