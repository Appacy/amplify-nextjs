import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import authSlice from './reducers/auth/authSlice';

const rootReducer = combineReducers({ 
  auth: authSlice
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;