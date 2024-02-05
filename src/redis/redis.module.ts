import { Module } from '@nestjs/common';
import { createClient } from 'redis';

@Module({
  /** used custom provider (value provider) => provide can use any name you like */
  providers: [
    {
      provide: 'REDIS_OPTIONS',
      useValue: {
        url: 'redis://default:LbE3XSIud2xa1ypOgrYWs8yOKfOPZvTw@redis-18903.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:18903',
      },
    },
    /** used custom provider (factory provider) => [provide can use any name you like] / [inject is come from provide of value provider , and useFactory(callback function) take optional argument that is come from value of useValue key of value provider ]  */
    {
      inject: ['REDIS_OPTIONS'],
      provide: 'REDIS_CLIENT',
      useFactory: async (options: { url: string; ttl: 2000 }) => {
        const client = createClient(options);
        await client.connect();
        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
