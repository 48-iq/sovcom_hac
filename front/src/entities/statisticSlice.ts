import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getStatistics } from './api';

export interface Receipt {
  id: string;
  total: number;
  date: string;
  seller: string;
  category: string;
}

export interface StatisticResponse {
  from: string;
  to: string;
  receipt: Receipt[];
}

interface StatisticState {
  statistics: StatisticResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatisticState = {
  statistics: null,
  loading: false,
  error: null,
};

export const fetchStatistic = createAsyncThunk<StatisticResponse, { from: string; to: string }, { rejectValue: string }>(
  'statistics/fetchStatistic',
  async ({ from, to }, { rejectWithValue }) => {
    try {
      const response = await getStatistics(from, to);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Ошибка при получении статистики');
    }
  }
);

const statisticSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    clearStatistics(state) {
      state.statistics = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatistic.fulfilled, (state, action: PayloadAction<StatisticResponse>) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchStatistic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || 'Ошибка';
      });
  },
});

export const { clearStatistics } = statisticSlice.actions;
export default statisticSlice.reducer;
