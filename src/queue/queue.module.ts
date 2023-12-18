import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { BullModule } from '@nestjs/bull';
import { QueueConsumer } from './queue.consumer';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
    BullModule.registerQueue({ name: 'gateway' }),
  ],
  controllers: [QueueController],
  providers: [QueueService, QueueConsumer],
  exports: [QueueConsumer],
})
export class QueueModule {}
