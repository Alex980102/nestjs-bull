import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  constructor(@InjectQueue('gateway') private readonly queue: Queue) {}

  async addToQueue(data: any) {
    this.logger.log('[addToQueue] Starting...');
    const queue = await this.queue.add('process', data);
    this.logger.log('[addToQueue] Finished.');
    return queue;
  }
}
