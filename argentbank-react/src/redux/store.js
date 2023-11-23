import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './user.reducer';

// configuration pour la persistance du reducer 'user'
const persistConfigUser = {
  key: 'user',
  version: 1,
  storage,
};

// Middleware Redux persist
const persistMiddleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});

// configuration et création du store
const store = configureStore({
  reducer: {
    user: persistReducer(persistConfigUser, userSlice),
  },
  middleware: persistMiddleware,
});

// création persistor
const persistor = persistStore(store);

export { store, persistor };
