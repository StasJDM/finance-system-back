import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionRepository.createTransaction(createTransactionDto);
  }

  findAll() {
    return this.transactionRepository.findAll();
  }

  findOne(id: string) {
    return this.transactionRepository.findById(id);
  }
}
