export interface account {
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

export interface userInfo {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface userInfoResponse {
  data: userInfo;
}

export interface accountResponse {
  data: account[];
  errors: string[];
}

export interface transactions {
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

export interface transactionsResponse {
  data: transactions[];
  pagination: transactionPagination;
  errors: string[];
}
