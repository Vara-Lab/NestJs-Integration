import { Module } from '@nestjs/common';
import { ContractCallsController } from './contract-calls.controller';
import { SailsService } from '../sails/sails.service';

@Module({
  controllers: [ContractCallsController],
  providers: [
    SailsService
  ]
})
export class ContractCallsModule {}
