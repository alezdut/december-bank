import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginResponse } from '../../api/session/SessionApiResponse';
import { SessionPayload } from '../types/session';

const intialState: SessionPayload = {
  isAuthenticated: false,
  accessToken: '',
  error: '',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: intialState,
  reducers: {
    startSession: (state, { payload }: PayloadAction<loginResponse>) => ({
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
