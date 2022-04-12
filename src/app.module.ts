import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from './modules/transaction/transaction.module';
import OrmConfig from 'ormconfig';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(OrmConfig), TransactionModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
