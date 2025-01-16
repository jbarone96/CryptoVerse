import { Coin } from "../../types";

export interface TrendList {
  item: Coin;
}

export interface TrendListState {
  coins: TrendList[];
  exchanges: [];
}
