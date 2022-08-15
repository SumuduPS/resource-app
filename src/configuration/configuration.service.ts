import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Resource } from 'src/resource/resource.entity';
import { User } from 'src/users/user.entity';

export enum Envrionment {
  Production = 'production',
  QA = 'qa',
  Local = 'local',
}

@Injectable()
export class ConfigurationService {
  constructor(
    private configService: ConfigService,
    private readonly logger: Logger,
  ) { }

  getConfig = <T>(key: string): T => {
    const value = this.configService.get<T>(key);
    if (!value) {
      this.logger.warn(
        `Configuration for ${key} not found. Please make sure you have up to date .env file`,
      );
    }
    return value;
  };

  get port(): number {
    return this.getConfig<number>('PORT');
  }

  get environment(): Envrionment {
    return this.getConfig<Envrionment>('ENV');
  }

  get postgresConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getConfig('POSTGRES_HOST'),
      port: this.getConfig('POSTGRES_PORT'),
      username: this.getConfig('POSTGRES_USER'),
      password: this.getConfig('POSTGRES_PASSWORD'),
      database: this.getConfig('POSTGRES_DB'),
      entities:[Resource,User],
      synchronize: false,
    };
  }
}
