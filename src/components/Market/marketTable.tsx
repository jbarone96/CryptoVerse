import React, { useEffect, useState } from "react";
import { Table, InputGroup, Form, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TableRow from "./tableRow";
import { fetchMarketData } from "../../features/Market/marketSection";
import { MarketState, MarketCoin } from "../../types";
import "./market.scss";

const MarketTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(fetchMarketData());
  }, [dispatch]);

  const market = useSelector(
    (state: { market: MarketState }) => state.market.data
  );

  const isLoading = useSelector(
    (state: { market: MarketState }) => state.market.loading
  );

  const error = useSelector(
    (state: { market: MarketState }) => state.market.error
  );

  const handleSearch = (e: any) => {
    let value = e.target.value;
    setSearch(value.replace(/\s+g/, ""));
  };

  const filteredMarket = !search
    ? market
    : market?.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.symbol.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className="section-gap">
      <div className="section-header">
        <h4 className="section-title">Prices</h4>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search Coin"
            onChange={handleSearch}
          />
        </InputGroup>
      </div>
      {isLoading && (
        <div className="my-4">
          <Spinner animation="border" />
        </div>
      )}
      {error && (
        <div className="my-4">
          <Alert variant="warning">Could not fetch market data.</Alert>
        </div>
      )}
      {filteredMarket && filteredMarket.length ? (
        <Table hover responsive className="customTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th className="text-end">Price</th>
              <th className="text-end">24hr</th>
              <th className="text-end">24hr Volume</th>
              <th className="text-end">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredMarket?.map((item: MarketCoin, idx: number) => (
              <TableRow key={idx} item={item} />
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="warning">Not found.</Alert>
      )}
    </div>
  );
};

export default MarketTable;
