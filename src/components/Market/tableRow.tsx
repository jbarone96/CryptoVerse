import React, { useState } from "react";
import { MarketRow } from "../../types";
import useCurrency from "../../hooks/useCurrency";
import ModalDetail from "../Modal/modalDetail";

const TableRow: React.FC<MarketRow> = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const formatCurrency = useCurrency();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <tr onClick={() => handleShowModal()}>
        <td>{item.market_cap_rank}</td>
        <td>
          <img src={item.img} alt={item.symbol} className="me-2" height={20} />
          <span className="fw-semibold">{item.name}</span>
          <small className="text-uppercase text-gray ms-2">
            ({item.symbol})
          </small>
        </td>
        <td className="text-end">{formatCurrency(item.current_price)}</td>
        <td className="text-end">
          <span
            className={
              item.price_change_percent_24hr > 0 ? "color--up" : "color--down"
            }
          >
            {item.price_change_percent_24hr.toFixed(1)}%
          </span>
        </td>
        <td className="text-end">{formatCurrency(item.total_vol)}</td>
        <td className="text-end">{formatCurrency(item.market_cap)}</td>
      </tr>

      <ModalDetail
        show={showModal}
        onHide={handleCloseModal}
        coinId={item?.id}
      />
    </>
  );
};

export default TableRow;
