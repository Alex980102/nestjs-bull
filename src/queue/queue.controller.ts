import { Controller, Post, Body, Logger } from '@nestjs/common';
import { QueueService } from './queue.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { queueResponses } from './response/queue.responses';
import { CreateQueueDto } from './dto/create-queue.dto';

@ApiTags('queue')
@Controller('queue')
export class QueueController {
  private readonly logger = new Logger(QueueController.name);

  constructor(private readonly queueService: QueueService) {}

  @ApiResponse(queueResponses.queue)
  @ApiResponse(queueResponses.badRequest)
  @ApiResponse(queueResponses.unauthorized)
  @ApiResponse(queueResponses.serverError)
  @Post('/')
  create(@Body() data: CreateQueueDto) {
    return this.queueService.addToQueue(data);
  }
}
