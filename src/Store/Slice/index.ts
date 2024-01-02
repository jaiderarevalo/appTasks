import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore, AnyAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk, { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import authSlice, { setLogout } from "./reducer/auth.slice";
import tasksSlice from "./reducer/tasks.slice";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Axios } from "../../Services/axios";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  tasks: tasksSlice,
});


export const setUpInterceptor = (store: any) => {
    const handleError = async (error: AxiosError) => {
        if(error.response?.status === 401){
            store.dispatch(setLogout())
        }
      return Promise.reject(error)
    }
  
    Axios.interceptors.request.use(
      async (config: any | AxiosRequestConfig) => {
        /* your logic here */
        return config
      }
    )
  
    Axios.interceptors.response.use((response) => response, handleError)
  }

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
setUpInterceptor(store)
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export default store;
