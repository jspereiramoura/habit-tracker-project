import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import modalReducer from "./slices/modalSlice";

const rootReducers = combineReducers({
  modal: modalReducer
});

export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    preloadedState,
    reducer: rootReducers
  });
}

export type AppDispatch = AppStore["dispatch"];
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducers>;

export const useAppStore = useStore.withTypes<AppStore>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
