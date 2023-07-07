import {Injectable} from "@nestjs/common";
import {BaseService} from "@common/base/base.service";
import Product from "@modules/product/models/product.model";
import {ProductDto} from "@modules/product/dtos/product.dto";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class ProductService extends BaseService<Product, ProductDto> {
  constructor(
    @InjectModel(Product)
    protected readonly _productRepo: typeof Product
  ) {
    super(_productRepo);
  }
}
