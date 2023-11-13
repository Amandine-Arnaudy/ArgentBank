import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist';


import storage from 'redux-persist/lib/storage';
import userSlice from './reducers/user.reducer';

const persistConfigUser = {
  key: 'user',
  version: 1,
  storage,
}

export default configureStore({
  middleware:(/*getDefaultMiddleware*/) =>
    getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  reducer: {
    user: persistReducer(persistConfigUser, userSlice)
  }
})