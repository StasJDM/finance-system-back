import { Injectable } from '@nestjs/common';
import { AddCategoryDto } from '../dto/add-category.dto';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { CategoryRepository } from '../repositories/category.repository';
import { TransactionRepository } from '../repositories/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository, private categoryRepository: CategoryRepository) {}

  create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionRepository.createTransaction(createTransactionDto);
  }

  findByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionRepository.findAll(userId);
  }

  async findAndGroupByMonth(userId: string): Promise<{ month: string; transactions: Transaction[] }[]> {
    const transactions = await this.transactionRepository.findAll(userId);

    const dates = transactions.map((transaction) => transaction.createdAt);
    const months = dates.reduce((prev, next) => {
      const month = next.getMonth();
      if (!prev.includes(month)) {
        return [...prev, month];
      } else {
        return prev;
      }
    }, []);

    const transactionsByMonth = months.map((month) => {
      const transactionsInCurrentMonth = transactions.filter((tr) => tr.createdAt.getMonth() === month);
      return {
        month,
        transactions: transactionsInCurrentMonth,
        count: transactionsInCurrentMonth.length,
        amount: transactionsInCurrentMonth.reduce((prev, next) => prev + next.amount, 0),
      };
    });

    return transactionsByMonth;
  }

  async findIncomingAndGroupByMonth(userId: string): Promise<{ month: string; transactions: Transaction[] }[]> {
    const transactions = await this.transactionRepository.findAllIncoming(userId);

    const dates = transactions.map((transaction) => transaction.createdAt);
    const months = dates.reduce((prev, next) => {
      const month = next.getMonth();
      if (!prev.includes(month)) {
        return [...prev, month];
      } else {
        return prev;
      }
    }, []);

    const transactionsByMonth = months.map((month) => {
      const transactionsInCurrentMonth = transactions.filter((tr) => tr.createdAt.getMonth() === month);
      return {
        month,
        transactions: transactionsInCurrentMonth,
        count: transactionsInCurrentMonth.length,
        amount: transactionsInCurrentMonth.reduce((prev, next) => prev + next.amount, 0),
      };
    });

    return transactionsByMonth;
  }

  async findOutgoingAndGroupByMonth(userId: string): Promise<{ month: string; transactions: Transaction[] }[]> {
    const transactions = await this.transactionRepository.findAllOutgoing(userId);

    const dates = transactions.map((transaction) => transaction.createdAt);
    const months = dates.reduce((prev, next) => {
      const month = next.getMonth();
      if (!prev.includes(month)) {
        return [...prev, month];
      } else {
        return prev;
      }
    }, []);

    const transactionsByMonth = months.map((month) => {
      const transactionsInCurrentMonth = transactions.filter((tr) => tr.createdAt.getMonth() === month);
      return {
        month,
        transactions: transactionsInCurrentMonth,
        count: transactionsInCurrentMonth.length,
        amount: transactionsInCurrentMonth.reduce((prev, next) => prev + next.amount, 0),
      };
    });

    return transactionsByMonth;
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

  async addCategory(userId: string, transactionId: string, addCategoryDto: AddCategoryDto): Promise<Transaction> {
    const category = await this.categoryRepository.findById(userId, addCategoryDto.id);
    return this.transactionRepository.addCategory(userId, transactionId, category);
  }

  removeCategory(userId: string, transactionId: string, categoryId: string): Promise<Transaction> {
    return this.transactionRepository.removeCategory(userId, transactionId, categoryId);
  }
}
