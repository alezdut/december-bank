import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Login } from '../../api/session/SessionApiResponse';
import { SessionPayload } from '../types/session';

const initialState: SessionPayload = {
  isAuthenticated: false,
  accessToken: '',
  error: '',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startSession: (state, { payload }: PayloadAction<Login>) => ({
      ...state,
      accessToken: payload.token,
      isAuthenticated: true,
      error: '',
    }),
    endSession: (state) => ({
      ...state,
      accessToken: '',
      isAuthenticated: false,
      error: '',
    }),
    setError: (state, { payload }) => ({
      ...state,
      accessToken: '',
      error: payload,
    }),
  },
});

export const { startSession, endSession, setError } = sessionSlice.actions;

export { sessionSlice };

export default sessionSlice.reducer;
