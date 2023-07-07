import { Module } from '@nestjs/common';
import Receipt from '@modules/receipt/models/receipt.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReceiptController } from '@modules/receipt/controllers/receipt.controller';
import { ReceiptService } from '@modules/receipt/services/receipt.service';

@Module({
  imports: [SequelizeModule.forFeature([Receipt])],
  controllers: [ReceiptController],
  exports: [ReceiptService],
  providers: [ReceiptService],
})
export class ReceiptModule {}
