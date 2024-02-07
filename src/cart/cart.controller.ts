import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartService } from './cart.service';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern({ cmd: 'create-cart' })
  create(
    @Payload()
    payload: {
      cartItems: {
        productId: string;
        unitPrice: number;
        quantity: number;
      }[];
      userId: string;
    },
    // dto: {
    //   userId: string;
    //   productId: string[];
    //   quantity: number[];
    //   unitPrice: number[];
    // },ss
  ) {
    // console.log(payload);
    return this.cartService.create(payload);
  }

  @MessagePattern('findAllCart')
  findAll() {
    return this.cartService.findAll();
  }

  @MessagePattern('findOneCart')
  findOne(@Payload() id: number) {
    return this.cartService.findOne(id);
  }

  @MessagePattern('removeCart')
  remove(@Payload() id: number) {
    return this.cartService.remove(id);
  }
}
