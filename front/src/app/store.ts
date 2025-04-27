import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from '../entities/authSlice';
import statisticSlice from '../entities/statisticSlice';
import recommendationsSlice from '../entities/recommendationsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    statistics: statisticSlice,
    recommendations: recommendationsSlice,
  }
})  

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;