import axios from 'axios';
import {
  account,
  accountResponse,
  transactionsResponse,
} from './AccountApiResponse';

const baseUrl = 'https://decemberbank.inhouse.decemberlabs.com/api';

export const getAccounts = async (): Promise<account[]> => {
  const token = sessionStorage.getItem('accessToken');

  const { data } = await axios.get<accountResponse>(`${baseUrl}/accounts`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export const getTransactions = async (
  params?: any,
): Promise<transactionsResponse> => {
  const token = sessionStorage.getItem('accessToken');
  const { page, pageSize, field, sort } = params;
  const { data } = await axios.get<transactionsResponse>(
    `${baseUrl}/transactions`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        page_size: pageSize,
        sort_by: field,
        order_by: sort,
      },
    },
  );
  return data;
};
