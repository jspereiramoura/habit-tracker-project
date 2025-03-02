import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import { habitsApi } from "./services/habits";
import modalReducer from "./slices/modalSlice";

const rootReducers = combineReducers({
  modal: modalReducer,
  [authApi.reducerPath]: authApi.reducer,
  [habitsApi.reducerPath]: habitsApi.reducer
});

export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    preloadedState,
    reducer: rootReducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(habitsApi.middleware)
  });
}

export type AppDispatch = AppStore["dispatch"];
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducers>;