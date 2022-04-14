import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { TransactionRepository } from '../repositories/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionRepository.createTransaction(createTransactionDto);
  }

  findByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionRepository.findAll(userId);
  }

  findCountByUserId(userId: string): Promise<number> {
    return this.transactionRepository.findAllCount(userId);
  }

  findTransactionsAmount(userId: string): Promise<{ incoming: number; outgoing: number }> {
    return this.transactionRepository.findUsersTransactionAmount(userId);
  }

  findUserOutgoing(userId: string): Promise<Transaction[]> {
    return this.transactionRepository.findAllOutgoing(userId);
  }

  findOutgoingCount(userId: string): Promise<number> {
    return this.transactionRepository.findOutgoingCount(userId);
  }

  findOutgoingTop(userId: string, count: number): Promise<Transaction[]> {
    return this.transactionRepository.findOutgoingTop(userId, count);
  }

  findUserIncoming(userId: string): Promise<Transaction[]> {
    return this.transactionRepository.findAllIncoming(userId);
  }

  findIncomingCount(userId: string): Promise<number> {
    return this.transactionRepository.findIncomingCount(userId);
  }

  findIncomingTop(userId: string, count: number): Promise<Transaction[]> {
    return this.transactionRepository.findIncomingTop(userId, count);
  }

  findOne(userId: string, id: string): Promise<Transaction> {
    return this.transactionRepository.findById(userId, id);
  }

  search(userId: string, searchTerm: string): Promise<Transaction[]> {
    return this.transactionRepository.search(userId, searchTerm);
  }
}
