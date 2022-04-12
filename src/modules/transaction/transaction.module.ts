import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, TransactionRepository])],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TypeOrmModule],
})
export class TransactionModule {}
