import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/constants";
import axios from "axios";
import { MarketState } from "../../types";

export const fetchMarketData = createAsyncThunk("fetchMarketData", async () => {
  const { data } = await axios.get(
    `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
  );
  return data;
});

const initialState: MarketState = {
  data: [],
  loading: false,
  error: null,
};

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMarketData.rejected, (state, action) => {
        state.data = [];
        state.loading = false;
        state.error = action.error.message || "An Error Has Occurred.";
      });
  },
});

export default marketSlice.reducer;
