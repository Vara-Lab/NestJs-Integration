import { Module } from '@nestjs/common';
import { SailsService } from './sails/sails.service';
import { ContractCallsModule } from './contract-calls/contract-calls.module';


@Module({
  imports: [ContractCallsModule],
})
export class AppModule {}
