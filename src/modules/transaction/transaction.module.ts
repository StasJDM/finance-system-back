import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './repositories/transaction.repository';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, TransactionRepository, Category, CategoryRepository])],
  controllers: [TransactionController, CategoryController],
  providers: [TransactionService, CategoryService],
  exports: [TypeOrmModule],
})
export class TransactionModule {}
