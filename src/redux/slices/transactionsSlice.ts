import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { transactionsResponse } from '../../api/account/AccountApiResponse';
import { TransactionsPayload } from '../types/transactions';

const intialState: TransactionsPayload = {
  transactions: [
    {
      id: 0,
      from_account_id: 0,
      to_account_id: 0,
      currency_name: '',
      amount: 0,
      createdAt: '',
    },
  ],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: intialState,
  reducers: {
    loadTransactions: (
      state,
      { payload }: PayloadAction<transactionsResponse[]>,
    ) => ({
      ...state,
      transactions: payload,
    }),
    unLoadTransactions: () => ({
      ...intialState,
    }),
  },
});

export const { loadTransactions, unLoadTransactions } =
  transactionsSlice.actions;

export { transactionsSlice };

export default transactionsSlice.reducer;
