import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CartService {
  constructor(private redisService: RedisService) {}

  async create(dto: {
    userId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
  }) {
    return await this.redisService.createCarts(dto);
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
