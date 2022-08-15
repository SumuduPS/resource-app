import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './configuration.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ConfigurationService, Logger],
  exports: [ConfigurationService]
})
export class ConfigurationModule { }
