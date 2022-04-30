import { EntityRepository, Like, Repository } from 'typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Category } from '../entities/category.entity';
import { Transaction } from '../entities/transaction.entity';

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
    const transactions = await this.find({
      where: [{ id_from: userId }, { id_to: userId }],
      relations: ['categories', 'from', 'to'],
    });
    return this._filterOnlyCurrentUserTransactionsCategories(transactions, userId);
  }

  public async findAllCount(userId: string): Promise<number> {
    return await this.count({
      where: [{ id_from: userId }, { id_to: userId }],
    });
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
    const transactions = await this.find({
      where: { id_from: userId },
      relations: ['categories'],
    });
    return this._filterOnlyCurrentUserTransactionsCategories(transactions, userId);
  }

  public async findOutgoingCount(userId: string): Promise<number> {
    return await this.count({
      where: { id_from: userId },
      relations: ['categories'],
    });
  }

  public async findOutgoingTop(userId: string, count: number): Promise<Transaction[]> {
    const transactions = await this.find({
      where: { id_from: userId },
      order: { label: 'DESC' },
      relations: ['categories'],
      take: count,
    });
    return this._filterOnlyCurrentUserTransactionsCategories(transactions, userId);
  }

  public async findAllIncoming(userId: string): Promise<Transaction[]> {
    const transactions = await this.find({
      where: { id_to: userId },
      relations: ['categories'],
    });
    return this._filterOnlyCurrentUserTransactionsCategories(transactions, userId);
  }

  public async findIncomingCount(userId: string): Promise<number> {
    return await this.count({
      where: { id_to: userId },
      relations: ['categories'],
    });
  }

  public async findIncomingTop(userId: string, count: number): Promise<Transaction[]> {
    const transactions = await this.find({
      where: { id_to: userId },
      order: { label: 'DESC' },
      relations: ['categories'],
      take: count,
    });
    return this._filterOnlyCurrentUserTransactionsCategories(transactions, userId);
  }

  public async findById(userId: string, id: string): Promise<Transaction> {
    const transaction = await this.findOne(id, {
      where: [{ id_from: userId }, { id_to: userId }],
      relations: ['categories'],
    });

    transaction.categories = transaction.categories.filter((category) => category.owner_id === userId);
    return transaction;
  }

  public async search(userId: string, searchTerm: string): Promise<Transaction[]> {
    const query: any[] = [{ label: Like(`%${searchTerm}%`) }];

    if (!isNaN(Number(searchTerm))) {
      query.push({ amount: searchTerm });
    }

    const transactions = await this.createQueryBuilder('transaction')
      .where(query)
      .andWhere(`(id_from='${userId}' OR id_to='${userId}')`)
      .leftJoinAndSelect('transaction.categories', 'category')
      .getMany();

    return this._filterOnlyCurrentUserTransactionsCategories(transactions, userId);
  }

  public async addCategory(userId: string, transactionId: string, category: Category): Promise<Transaction> {
    const transaction = await this.findOne({
      where: [
        { id: transactionId, id_from: userId },
        { id: transactionId, id_to: userId },
      ],
    });

    if (!transaction.categories) {
      transaction.categories = [];
    }

    transaction.categories = [...transaction.categories, category];

    await this.save(transaction);

    console.log(transaction, category);

    transaction.categories = transaction.categories.filter((category) => category.owner_id === userId);
    return transaction;
  }

  public async removeCategory(userId: string, transactionId: string, categoryId: string): Promise<Transaction> {
    const transaction = await this.findOne({
      where: [
        { id: transactionId, id_from: userId },
        { id: transactionId, id_to: userId },
      ],
    });

    transaction.categories = (transaction.categories || []).filter((category) => category.id !== categoryId);

    await this.save(transaction);

    transaction.categories = transaction.categories.filter((category) => category.owner_id === userId);
    return transaction;
  }

  private _filterOnlyCurrentUserTransactionsCategories(transactions: Transaction[], userId: string): Transaction[] {
    return transactions.map((transaction) => {
      transaction.categories = transaction.categories.filter((category) => category.owner_id === userId);
      return transaction;
    });
  }
}
