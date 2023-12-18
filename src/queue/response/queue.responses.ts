import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const queueResponses: { [key: string]: ApiResponseOptions } = {
  queue: {
    description: 'Se ha agregado correctamente.',
    status: HttpStatus.ACCEPTED,
    schema: {
      example: {
        message: 'Se ha agregado correctamente.',
        data: {},
      },
    },
  },
  badRequest: {
    description: 'Error obtaining the concession.',
    status: HttpStatus.BAD_REQUEST,
    schema: {
      example: {
        message: 'Error obtaining the concession: [error details]',
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
      },
    },
  },
  unauthorized: {
    description: 'Invalid or expired JWT token.',
    status: HttpStatus.UNAUTHORIZED,
    schema: {
      example: {
        message: 'Invalid token',
        error: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
    },
  },
  serverError: {
    description: 'Internal server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    schema: {
      example: {
        message: 'An internal error occurred',
        error: 'Internal Server Error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    },
  },
};
