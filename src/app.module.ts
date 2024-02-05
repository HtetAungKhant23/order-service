import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { RedisModule } from './redis/redis.module';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [RedisModule, OrderModule, CartModule],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}
