import { Logger, Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  providers: [ResourceService,Logger],
  controllers: [ResourceController]
})
export class ResourceModule {}
