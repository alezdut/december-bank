import { Transaction } from '../../api/account/AccountApiResponse';

export interface TransactionsPayload {
  transactions: Transaction[];
}
