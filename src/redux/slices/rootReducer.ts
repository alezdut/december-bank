import { combineReducers } from '@reduxjs/toolkit';
import session from './sessionSlice';
import account from './accountSlice';
import transactions from './transactionsSlice';

const rootReducer = combineReducers({
  session,
  account,
  transactions,
});

export default rootReducer;
