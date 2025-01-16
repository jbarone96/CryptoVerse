export interface Coin {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumbnail: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
}

export interface TrendingCard {
  item: Coin;
}

export interface MarketState {
  data: any[] | null;
  loading: boolean;
  error: string | null;
}

export interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  img: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  vaulation: number;
  total_vol: number;
  high_24hr: number;
  low_24hr: number;
  price_change_24hr: number;
  price_change_percent_24hr: number;
  market_cap_change: number;
  market_cap_change_percent_24hr: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change: number;
  ath_date: string;
  atl: number;
  atl_change: number;
  atl_date: string;
  roi: any | null;
  last_updated: string;
}

export interface MarketRow {
  item: MarketCoin;
}

export interface ModalDetails {
  show: boolean;
  onHide: () => void;
  coinId: string;
}
