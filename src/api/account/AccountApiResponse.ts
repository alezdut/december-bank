export interface accountResponse {
  id: number;
  balance: number;
  owner_id: number;
  createdAt: string;
  updatedAt: string;
  currency_id: number;
  currency: {
    name: string;
  };
}

export interface getAccountResponse {
  data: accountResponse[];
  errors: string[];
}

export interface transactionsResponse {
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

export interface getTransactionsResponse {
  data: transactionsResponse[];
  pagination: transactionPagination;
  errors: string[];
}
