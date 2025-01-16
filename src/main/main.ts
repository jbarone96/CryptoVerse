import { configureStore } from "@reduxjs/toolkit";
import TrendSlice from "../features/Trending/trendSection";
import MarketSlice from "../features/Market/marketSection";
import CryptoSlice from "../features/Crypto/cryptoSection";

export const store = configureStore({
  reducer: {
    trend: TrendSlice,
    market: MarketSlice,
    crypto: CryptoSlice,
  },
});
