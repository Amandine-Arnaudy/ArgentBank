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

// configuration pour la persistance du reducer 'user'
const persistConfigUser = {
  key: 'user',
  version: 1,
  storage,
}

// config et création du store
export default configureStore({
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  reducer: {
    user: persistReducer(persistConfigUser, userSlice)
  }
})