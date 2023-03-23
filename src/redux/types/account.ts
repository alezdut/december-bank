import { Account } from '../../api/account/AccountApiResponse';

export interface AccountPayload {
  user: {
    id: number;
    name: string;
    email: string;
  };
  accounts: Account[];
}
