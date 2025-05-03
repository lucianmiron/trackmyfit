import { Module } from '@nestjs/common';
import { LoggerModule as LoggerModulePino } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModulePino.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
