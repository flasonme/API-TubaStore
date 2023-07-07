import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  PrimaryKey,
  Table,
  UpdatedAt,
  Validate,
} from 'sequelize-typescript';

import { AbstractModel } from '@common/abstract.model';
import { ReceiptDto } from '@modules/receipt/dtos/receipt.dto';
import { UseDto } from '@decorators/use-dto.decorator';
import { IReceipt } from '@modules/receipt/interfaces/receipt.interface';
import Product from '@modules/product/models/product.model';
import {
  ReceiptSize,
  ReceiptStatus,
} from '@modules/receipt/consts/receipt.const';

@UseDto(ReceiptDto)
@Table({
  tableName: 'receipts',
  timestamps: true,
  paranoid: true,
})
export default class Receipt
  extends AbstractModel<ReceiptDto>
  implements IReceipt
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column
  product_id: string;

  @AllowNull(false)
  @Validate({
    isIn: [[...Object.values(ReceiptSize)]],
  })
  @Column
  size: ReceiptSize;

  @AllowNull(false)
  @Column
  color: string;

  @Column
  price: number;

  @Default(1)
  @Validate({ min: 1 })
  @Column
  stock: number;

  @Default([])
  @Column(DataType.ARRAY(DataType.STRING))
  images: Array<string>;

  @Default(ReceiptStatus.ACTIVE)
  @Validate({
    isIn: [[...Object.values(ReceiptStatus)]],
  })
  @Column
  status: ReceiptStatus;

  @CreatedAt
  @Column
  created_at: Date;
  @UpdatedAt
  @Column
  updated_at: Date;
  @DeletedAt
  @Column
  deleted_at: Date;

  @BelongsTo(() => Product)
  product: Product;
}
