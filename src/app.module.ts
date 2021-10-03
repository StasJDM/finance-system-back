import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import configuration from './config/configuration';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
