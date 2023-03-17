import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { account, userInfo } from '../../api/account/AccountApiResponse';
import { AccountPayload } from '../types/account';

const intialState: AccountPayload = {
  user: {
    id: 0,
    name: '',
    email: '',
  },
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
    loadAccounts: (state, { payload }: PayloadAction<account[]>) => ({
      ...state,
      accounts: payload,
    }),
    unLoadAccount: (state) => ({
      ...state,
      accounts: intialState.accounts,
    }),
    loadUserInfo: (state, { payload }: PayloadAction<userInfo>) => ({
      ...state,
      user: {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      },
    }),
    unLoadUserinfo: (state) => ({
      ...state,
      user: intialState.user,
    }),
  },
});

export const { loadAccounts, unLoadAccount, loadUserInfo, unLoadUserinfo } =
  sessionSlice.actions;

export { sessionSlice };

export default sessionSlice.reducer;
