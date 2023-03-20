export interface account {
  id: number;
  balance: number;
  owner_id: number;
  createdAt: string;
  updatedAt: string;
  currency_id: number;
  currency: {
    name: currency;
  };
}

export type currency = 'USD' | 'EU' | 'URU';

export interface userInfo {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface transaction {
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

export interface transactionPagination {
  currentPage: number;
  hasMorePages: boolean;
  pageSize: number;
  totalPages: number;
  totalRows: number;
}

export interface rates {
  usd: number;
  eu: number;
}

export interface transactionsResponse {
  data: transaction[];
  pagination: transactionPagination;
  errors: string[];
}

export interface transferResponse {
  data: transaction;
  errors: string[];
}

export interface ratesResponse {
  data: rates;
}

export interface userInfoResponse {
  data: userInfo;
}

export interface accountResponse {
  data: account[];
  errors: string[];
}
