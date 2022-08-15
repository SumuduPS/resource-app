import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port=process.env.PORT;
  const logger=new Logger();
  await app.listen(port,()=>{
    logger.log(`server started at port ${port}`)
  });
}
bootstrap();
