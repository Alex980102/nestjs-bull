import { Module } from '@nestjs/common';
import { QueueModule } from './queue/queue.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    QueueModule,
  ],
})
export class AppModule {}
