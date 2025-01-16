import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/constants";
import axios from "axios";
import { TrendListState } from "./trendTypes";

interface State {
  data: TrendListState[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTrendData = createAsyncThunk("fetchTrendData", async () => {
  const { data } = await axios.get(`${API_URL}/search/trending`);
  return data;
});

const trendSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTrendData.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.error.message || "An Error Has Occurred.";
      });
  },
});

export default trendSlice.reducer;
