import { EntityRepository, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  public async createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const { id_from, id_to, amount, label } = createTransactionDto;
    const transaction = new Transaction();

    transaction.id_from = id_from;
    transaction.id_to = id_to;
    transaction.amount = amount;
    transaction.label = label;

    return await this.save(transaction);
  }

  public async findAll(): Promise<Transaction[]> {
    return await this.find({});
  }

  public async findById(id: string): Promise<Transaction> {
    return await this.findOne(id);
  }
}
