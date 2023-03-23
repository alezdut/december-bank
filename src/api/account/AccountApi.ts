import axiosInstance from '../common/axiosInstance';
import { TransferRequest } from './AccountApiRequest';
import {
  Account,
  AccountResponse,
  Rates,
  RatesResponse,
  TransactionsResponse,
  TransferResponse,
  UserInfo,
  UserInfoResponse,
} from './AccountApiResponse';

export const getAccounts = async (): Promise<Account[]> => {
  const { data } = await axiosInstance.get<AccountResponse>(`/accounts`);
  return data.data;
};

interface ParamsType {
  page: number;
  pageSize: number;
  field: string;
  sort: string;
}

export const getTransactions = async (
  queryParams: ParamsType,
): Promise<TransactionsResponse> => {
  const { page, pageSize, field, sort } = queryParams;

  const params = { page, page_size: pageSize, sort_by: field, order_by: sort };

  const { data } = await axiosInstance.get<TransactionsResponse>(
    `/transactions`,
    {
      params,
    },
  );
  return data;
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const { data } = await axiosInstance.get<UserInfoResponse>(`/users/me`);
  return data.data;
};

export const postTransaction = async (
  request: TransferRequest,
): Promise<TransferResponse> => {
  const { data } = await axiosInstance.post<TransferResponse>(
    `/transactions`,
    request,
  );
  return data;
};

export const getRates = async (): Promise<Rates> => {
  const { data } = await axiosInstance.get<RatesResponse>(
    `/transactions/rates`,
  );
  return data.data;
};
