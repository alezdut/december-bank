export interface Account {
  id: number;
  balance: number;
  owner_id: number;
  createdAt: string;
  updatedAt: string;
  currency_id: number;
  currency: Currency;
}

export type Currency = {
  name: 'USD' | 'EU' | 'URU';
};

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  amount_from: number;
  amount_to: number;
  currency_name: string;
  createdAt: string;
  updatedAt: string;
  from_account_id: number;
  to_account_id: number;
}

export interface TransactionPagination {
  currentPage: number;
  hasMorePages: boolean;
  pageSize: number;
  totalPages: number;
  totalRows: number;
}

export interface Rates {
  usd: number;
  eu: number;
}

export interface TransactionsResponse {
  data: Transaction[];
  pagination: TransactionPagination;
  errors: string[];
}

export interface TransferResponse {
  data: Transaction;
  errors: string[];
}

export interface RatesResponse {
  data: Rates;
}

export interface UserInfoResponse {
  data: UserInfo;
}

export interface AccountResponse {
  data: Account[];
  errors: string[];
}
