import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';





const logFilePath = 'errors.log';
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

   
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const message =
      exception.message || 'Internal server error';

    const errorResponse = {
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
    };

    const logMessage = `[${new Date().toISOString()}] ${status} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);

    response.status(status).json(errorResponse);






  }
}
