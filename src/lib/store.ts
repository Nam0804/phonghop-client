import { MiddlewareArray, combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import loadingReducer from './features/loadingSlice'
import profileReducer from '@/lib/slices/profileSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import { profileApi } from '@/lib/services/profileApi';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
    user: userReducer,
    loading: loadingReducer,
    profile: profileReducer,
    [profileApi.reducerPath]: profileApi.reducer,
})

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
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
            (getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                }, 
            }) as MiddlewareArray<any>).concat([
                profileApi.middleware,
            ])
    })
}

setupListeners(makeStore().dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const persistor = persistStore(makeStore())
