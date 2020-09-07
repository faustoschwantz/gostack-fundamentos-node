import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: Omit<Transaction, 'id'>): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (transaction.type === 'outcome' && transaction.value > balance.total)
      throw Error('Insufficient balance');

    const newTransaction = this.transactionsRepository.create(transaction);
    return newTransaction;
  }
}

export default CreateTransactionService;
