import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;

    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .map(values => values.value)
      .reduce((valueAccumulator, current) => valueAccumulator + current, 0);

    const outcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(values => values.value)
      .reduce((valueAccumulator, current) => valueAccumulator + current, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, type, value }: CreateTransction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
