import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { accountResponse } from '../../api/account/AccountApiResponse';
import { AccountPayload } from '../types/account';

const intialState: AccountPayload = {
  accounts: [
    {
      id: 0,
      balance: 0,
      owner_id: 0,
      createdAt: '',
      updatedAt: '',
      currency_id: 0,
      currency: {
        name: '',
      },
    },
  ],
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: intialState,
  reducers: {
    loadAccounts: (state, { payload }: PayloadAction<accountResponse[]>) => ({
      ...state,
      accounts: payload,
    }),
    unLoadAccount: () => ({
      ...intialState,
    }),
  },
});

export const { loadAccounts, unLoadAccount } = sessionSlice.actions;

export { sessionSlice };

export default sessionSlice.reducer;
