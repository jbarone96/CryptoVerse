import React, { useEffect } from "react";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import TrendCard from "./trendCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendData } from "../../features/Trending/trendSection";
import { Coin } from "../../types";
import "./trend.scss";

const TrendList: React.FC = () => {
  const dispatch: any = useDispatch();

  const { coins } = useSelector(
    (state: { trend: { data: { coins: any } } }) => state.trend.data
  );

  const isLoading = useSelector(
    (state: { trend: { loading: boolean } }) => state.trend.loading
  );
  const error = useSelector(
    (state: { trend: { error: string | null } }) => state.trend.error
  );

  useEffect(() => {
    dispatch(fetchTrendData());
  }, [dispatch]);

  if (!coins) {
    return <div>Error Loading Coins</div>;
  }

  return (
    <div className="section-gap">
      <div className="section-header">
        <div className="section-title">Trending Coins (24hr)</div>
      </div>
      {isLoading && (
        <div className="my-4">
          <Spinner animation="border" />
        </div>
      )}

      {error && (
        <div className="my-4">
          <Alert variant="warning">An Error Occurred Fetching Data</Alert>
        </div>
      )}

      {coins && coins.length ? (
        <Row>
          {coins.slice(0, 6).map((coin: { item: Coin }, idx: number) => (
            <Col lg={4} sm={6} key={idx} className="mb-3">
              <TrendCard item={coin.item} />
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="warning">Coin Not Found.</Alert>
      )}
    </div>
  );
};

export default TrendList;
