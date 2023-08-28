import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attributes, Status, TokenPayload, AuthError, User } from '../../../types';

export interface AuthState {
    isAuthenticated: boolean;
    idToken?: string;
    idTokenPayload?: TokenPayload;
    attributes?: Attributes;
    status: Status;
    error?: AuthError;
}

const initialState: AuthState = {
    isAuthenticated: false,
    status: 'idle'
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setReset: (state) => {
        state.isAuthenticated = false;
        state.idToken = undefined;
        state.idTokenPayload = undefined;
        state.attributes = undefined;
        state.status = 'idle';
        state.error = undefined;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
        state.isAuthenticated = action.payload;
        if (!action.payload) {
          state.idToken = undefined;
          state.idTokenPayload = undefined;
          state.attributes = undefined;
        }
        state.status = 'idle';
        state.error = undefined;
    },
    setIdToken: (state, action: PayloadAction<string>) => {
        state.idToken = action.payload;
    },
    setIdTokenPayload: (state, action: PayloadAction<TokenPayload>) => {
        state.idTokenPayload = action.payload;
    },
    setAttributes: (state, action: PayloadAction<Attributes>) => {
      state.attributes = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<AuthError>) => {
      state.error = action.payload;
    },
  }
});

export const { 
    setReset,
    setIsAuthenticated,
    setIdToken,
    setIdTokenPayload,
    setAttributes,
    setStatus,
    setError
} = authSlice.actions;

export default authSlice.reducer;
