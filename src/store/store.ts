import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { postsReducer, authorsReducer, commentsReducer } from './reducers';

const rootReducers = combineReducers({
  posts: postsReducer,
  authors: authorsReducer,
  comments: commentsReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});

export const useAppDispatch: () => AppDispatch = useDispatch;

export type AppRootStateType = ReturnType<typeof store.getState>;

export type StoreType = typeof store;

export type AppDispatch = typeof store.dispatch;
