import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    const balance = this.transactions.reduce(
      (accumulator: Balance, current: Transaction) => {
        switch (current.type) {
          case 'income':
            accumulator.income += current.value;
            break;
          case 'outcome':
            accumulator.outcome += current.value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create(transaction: Omit<Transaction, 'id'>): Transaction {
    const newTransaction = new Transaction({ ...transaction });
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
