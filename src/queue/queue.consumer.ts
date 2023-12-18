import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';

@Processor('gateway')
export class QueueConsumer {
  private readonly logger = new Logger(QueueConsumer.name);

  @Process('process')
  handleTranscode(job: Job) {
    this.logger.log('[handleTranscode] Starting...');
    this.logger.log(job.data);
    this.logger.log('[handleTranscode] Finished.');
  }
}
