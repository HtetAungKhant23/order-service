import { Inject } from '@nestjs/common';
import { RedisClientType, SchemaFieldTypes } from 'redis';
import { cartPrefix } from './redis-schema';

export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
  ) {}

  async createCarts({
    userId,
    productId,
    quantity,
    unitPrice,
  }: {
    userId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
  }) {
    console.log(unitPrice);
    await this.createIndex();

    // ? to find first in redis
    const cart = await this.redis.json.set(`${cartPrefix}${userId}`, '$', {
      userId,
      productId,
      quantity,
      unitPrice,
    });
    console.log(cart);
    return {
      statusCode: 201,
      message: 'cart item created',
    };
  }

  // ? create index for cart
  private async createIndex() {
    try {
      await this.redis.ft.create(
        'idx:cartsIte',
        {
          '$.userId': {
            AS: 'userId',
            type: SchemaFieldTypes.TEXT,
            SORTABLE: true,
          },
          ['$.productId']: {
            AS: 'productId',
            type: SchemaFieldTypes.TEXT,
            SORTABLE: true,
          },
          '$.quantity': {
            AS: 'quantity',
            type: SchemaFieldTypes.NUMERIC,
            SORTABLE: true,
          },
          '$.unitPrices': {
            AS: 'unitPrices',
            type: SchemaFieldTypes.NUMERIC,
            SORTABLE: true,
          },
        },
        {
          ON: 'JSON',
          PREFIX: 'userId:',
        },
      );
    } catch (e) {
      if (e.message === 'Index already exists') {
        console.log('Index exists already, skipped creation.');
      } else {
        // Something went wrong, perhaps RediSearch isn't installed...
        console.error(e);
        process.exit(1);
      }
    }
  }
}
