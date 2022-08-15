import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Resource } from './resource/resource.entity';
import { ResourceModule } from './resource/resource.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/configuration.service';

@Module({
  imports: [
    ConfigurationModule,
    ResourceModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) =>
        configService.postgresConfig,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}