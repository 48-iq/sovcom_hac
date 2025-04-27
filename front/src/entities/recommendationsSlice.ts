import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getRecommendations } from './api';

export interface Recommendation {
  seller: string;
  cashback: number;
  category: string;
}

export interface Category {
  name: string;
  recs: Recommendation[];
}

interface RecommendationsState {
  recommendations: Category[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: RecommendationsState = {
  recommendations: null,
  loading: false,
  error: null,
};

export const fetchRecommendations = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'recommendations/fetchRecommendations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRecommendations();
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Ошибка при получении рекомендаций');
    }
  }
);

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    clearRecommendations(state) {
      state.recommendations = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || 'Ошибка';
      });
  },
});

export const { clearRecommendations } = recommendationsSlice.actions;
export default recommendationsSlice.reducer;
