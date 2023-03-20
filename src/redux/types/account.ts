import { currency } from '../../api/account/AccountApiResponse';

export interface AccountPayload {
  user: {
    id: number;
    name: string;
    email: string;
  };
  accounts: {
    id: number;
    balance: number;
    owner_id: number;
    createdAt: string;
    updatedAt: string;
    currency_id: number;
    currency: {
      name: currency;
    };
  }[];
}
