import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account, UserInfo } from '../../api/account/AccountApiResponse';
import { AccountPayload } from '../types/account';

const initialState: AccountPayload = {
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
        name: 'URU',
      },
    },
  ],
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    loadAccounts: (state, { payload }: PayloadAction<Account[]>) => ({
      ...state,
      accounts: payload,
    }),
    unloadAccount: (state) => ({
      ...state,
      accounts: initialState.accounts,
    }),
    loadUserInfo: (state, { payload }: PayloadAction<UserInfo>) => ({
      ...state,
      user: {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      },
    }),
    unloadUserinfo: (state) => ({
      ...state,
      user: initialState.user,
    }),
  },
});

export const { loadAccounts, unloadAccount, loadUserInfo, unloadUserinfo } =
  sessionSlice.actions;

export { sessionSlice };

export default sessionSlice.reducer;
