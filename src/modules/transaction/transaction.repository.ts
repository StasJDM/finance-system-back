import { EntityRepository, Like, Repository } from 'typeorm';
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

  public async findAll(userId: string): Promise<Transaction[]> {
    return await this.find({ where: [{ id_from: userId }, { id_to: userId }] });
  }

  public async findAllCount(userId: string): Promise<number> {
    return await this.count({ where: [{ id_from: userId }, { id_to: userId }] });
  }

  public async findUsersTransactionAmount(userId: string): Promise<{ incoming: number; outgoing: number }> {
    const { sum: incoming } = await this.createQueryBuilder()
      .select('SUM(amount)', 'sum')
      .where({ id_to: userId })
      .getRawOne();

    const { sum: outgoing } = await this.createQueryBuilder()
      .select('SUM(amount)', 'sum')
      .where({ id_from: userId })
      .getRawOne();

    return { incoming, outgoing };
  }

  public async findAllOutgoing(userId: string): Promise<Transaction[]> {
    return await this.find({ where: { id_from: userId } });
  }

  public async findOutgoingCount(userId: string): Promise<number> {
    return await this.count({ where: { id_from: userId } });
  }

  public async findOutgoingTop(userId: string, count: number): Promise<Transaction[]> {
    return await this.find({
      where: { id_from: userId },
      order: { label: 'DESC' },
      take: count,
    });
  }

  public async findAllIncoming(userId: string): Promise<Transaction[]> {
    return await this.find({ where: { id_to: userId } });
  }

  public async findIncomingCount(userId: string): Promise<number> {
    return await this.count({ where: { id_to: userId } });
  }

  public async findIncomingTop(userId: string, count: number): Promise<Transaction[]> {
    return await this.find({
      where: { id_to: userId },
      order: { label: 'DESC' },
      take: count,
    });
  }

  public async findById(userId: string, id: string): Promise<Transaction> {
    return await this.findOne(id, { where: [{ id_from: userId }, { id_to: userId }] });
  }

  public async search(userId: string, searchTerm: string): Promise<any> {
    const query: any[] = [{ label: Like(`%${searchTerm}%`) }];

    if (!isNaN(Number(searchTerm))) {
      query.push({ amount: searchTerm });
    }

    return this.createQueryBuilder('transaction')
      .where(query)
      .andWhere(`(id_from='${userId}' OR id_to='${userId}')`)
      .getMany();
  }
}
