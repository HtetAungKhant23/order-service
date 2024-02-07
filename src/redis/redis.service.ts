import { Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { cartPrefix } from './redis-schema';

export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
  ) {}

  async createCarts({
    cartItems,
    userId,
  }: {
    cartItems: {
      productId: string;
      unitPrice: number;
      quantity: number;
    }[];
    userId: string;
  }) {
    await this.redis.json.set(`${cartPrefix}${userId}`, '$', {
      userId,
      cartItems,
    });
    return {
      statusCode: 201,
      message: 'cart item created',
    };
  }
}
