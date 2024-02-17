import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from '../reducers/authSlice';

 const persistConfig = {
        key: 'root',
        storage,
        blacklist: [],
        // Add more configuration options as needed
    };

  const rootReducer = combineReducers({
      auth: persistReducer(persistConfig, authReducer),
      // Add more reducers as needed
    });

    const store = configureStore({
        reducer: rootReducer
    })

    const persistor = persistStore(store);

    export { persistor, store };