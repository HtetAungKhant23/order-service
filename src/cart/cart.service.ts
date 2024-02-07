import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CartService {
  constructor(private redisService: RedisService) {}

  async create(payload: {
    cartItems: {
      productId: string;
      unitPrice: number;
      quantity: number;
    }[];
    userId: string;
  }) {
    return await this.redisService.createCarts(payload);
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
