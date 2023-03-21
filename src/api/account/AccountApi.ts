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
  const token = sessionStorage.getItem('accessToken');
  const { data } = await axiosInstance.get<AccountResponse>(`/accounts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

interface paramsType {
  page: number;
  pageSize: number;
  field: string;
  sort: string;
}

export const getTransactions = async (
  queryParams: paramsType,
): Promise<TransactionsResponse> => {
  const token = sessionStorage.getItem('accessToken');
  const { page, pageSize, field, sort } = queryParams;

  const params = { page, page_size: pageSize, sort_by: field, order_by: sort };

  const { data } = await axiosInstance.get<TransactionsResponse>(
    `/transactions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    },
  );
  return data;
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const token = sessionStorage.getItem('accessToken');
  const { data } = await axiosInstance.get<UserInfoResponse>(`/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export const postTransaction = async (
  request: TransferRequest,
): Promise<TransferResponse> => {
  const token = sessionStorage.getItem('accessToken');
  const { data } = await axiosInstance.post<TransferResponse>(
    `/transactions`,
    request,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const getRates = async (): Promise<Rates> => {
  const token = sessionStorage.getItem('accessToken');
  const { data } = await axiosInstance.get<RatesResponse>(
    `/transactions/rates`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data.data;
};
