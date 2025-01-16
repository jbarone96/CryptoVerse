import React from "react";
import { Container } from "react-bootstrap";
import TrendList from "./components/Trending/trendList";
import MarketTable from "./components/Market/marketTable";

const App: React.FC = () => {
  return (
    <div className="my-4">
      <Container>
        <TrendList />
        <MarketTable />
      </Container>
    </div>
  );
};

export default App;
