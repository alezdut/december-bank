export interface TransactionsPayload {
  transactions: {
    id: number;
    from_account_id: number;
    to_account_id: number;
    currency_name: string;
    amount: number;
    createdAt: string;
  }[];
}
