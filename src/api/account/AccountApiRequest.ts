export interface TransferRequest {
  description: string;
  account_from: number;
  account_to: number;
  amount: number;
  currency_name: string;
}
