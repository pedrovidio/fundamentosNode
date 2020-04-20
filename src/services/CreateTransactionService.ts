import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  public total = 0;

  constructor(transactionsRepository: TransactionsRepository, total: number) {
    this.transactionsRepository = transactionsRepository;
    this.total = total;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === 'outcome' && value > this.total) {
      throw Error('Sem grana');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
