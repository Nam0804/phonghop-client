import { configureStore, combineReducers, MiddlewareArray } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistStore, persistReducer } from 'redux-persist'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { profileApi } from './services/profileApi';
import profileReducer from "./slices/profileSlice";

const reducers = combineReducers({
    profile: profileReducer,
    [profileApi.reducerPath]: profileApi.reducer,
});

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['storage', 'auth', 'cart']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        (getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }) as MiddlewareArray<any>).concat([
            profileApi.middleware,
        ]), // use MiddlewareArray
});


setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistorStore = persistStore(store);
