export interface AccountPayload {
  accounts: {
    id: number;
    balance: number;
    owner_id: number;
    createdAt: string;
    updatedAt: string;
    currency_id: number;
    currency: {
      name: string;
    };
  }[];
}
