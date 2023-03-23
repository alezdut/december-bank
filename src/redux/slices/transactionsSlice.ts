import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../../api/account/AccountApiResponse';
import { TransactionsPayload } from '../types/transactions';

const initialState: TransactionsPayload = {
  transactions: [
    {
      id: 0,
      from_account_id: 0,
      to_account_id: 0,
      currency_name: '',
      amount: 0,
      createdAt: '',
      description: '',
      amount_from: 0,
      amount_to: 0,
      updatedAt: '',
    },
  ],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    loadTransactions: (state, { payload }: PayloadAction<Transaction[]>) => ({
      ...state,
      transactions: payload,
    }),
    unloadTransactions: () => ({
      ...initialState,
    }),
  },
});

export const { loadTransactions, unloadTransactions } =
  transactionsSlice.actions;

export { transactionsSlice };

export default transactionsSlice.reducer;
