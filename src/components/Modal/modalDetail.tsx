import React, { useState } from "react";
import { Modal, Spinner, Badge, Button, ProgressBar } from "react-bootstrap";
import { ModalDetails } from "../../types";
import { useDispatch } from "react-redux";
import { fetchById } from "../../features/Crypto/cryptoSection";
import useCurrency from "../../hooks/useCurrency";
import useNumber from "../../hooks/useNumber";
import {
  CaretDownFill,
  CaretUpFill,
  Twitter,
  Facebook,
  Reddit,
  Github,
} from "react-bootstrap-icons";
import "./modalDetail.scss";

const ModalDetail: React.FC<ModalDetails> = ({ show, onHide, coinId }) => {
  const dispatch: any = useDispatch();

  const [crypto, setCrypto] = useState<any>(null);
  const formatCurrency = useCurrency();
  const formatNumber = useNumber();

  const handleEntered = async () => {
    const result = await dispatch(fetchById(coinId));
    console.log(result.payload);
    setCrypto(result.payload);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      onEntered={handleEntered}
      size="lg"
      centered
    >
      <Modal.Body className="p-4">
        {crypto && Object.keys(crypto).length > 0 ? (
          <div className="crypto-detail">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Badge bg="dark" className="mb-2">
                  Rank #: {crypto.market_cap_rank}
                </Badge>
                <div className="item-header">
                  <img
                    className="item-img"
                    src={crypto.img.small}
                    alt={crypto.name}
                    height={32}
                  />
                  <span className="item-name">{crypto.name}</span>
                  <span className="item-symbol">{crypto.symbol}</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="item-price">
                    {formatCurrency(crypto.market_data.current_price.usd)}
                  </div>
                  <div className="item-change">
                    <span
                      className={
                        crypto.market_data.price_change_percent_24hr > 0
                          ? "color--up"
                          : "color--down"
                      }
                    >
                      <div>
                        {crypto.market_data.price_change_percent_24hr.toFixed(
                          1
                        )}
                        %
                        {crypto.market_data.price_change_percent_24hr > 0 ? (
                          <CaretUpFill height={14} className="color--up" />
                        ) : (
                          <CaretDownFill height={14} className="color--down" />
                        )}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="item-buttons">
                {crypto.links.twitter_screen_name && (
                  <Button
                    className="d-flex align-items-center"
                    variant="light"
                    size="sm"
                    href={`https://twitter.com/${crypto.links.twitter_screen_name}`}
                    target="_blank"
                  >
                    <Twitter className="mx-1" /> Twitter
                  </Button>
                )}
                {crypto.links.facebook_username && (
                  <Button
                    className="d-flex align-items-center"
                    variant="light"
                    size="sm"
                    href={`https://facebook.com/${crypto.links.faceboook_username}`}
                    target="_blank"
                  >
                    <Facebook className="mx-1" /> Facebook
                  </Button>
                )}
                {crypto.links.subreddit_url && (
                  <Button
                    className="d-flex align-items-center"
                    variant="light"
                    size="sm"
                    href={crypto.links.subreddit_url}
                    target="_blank"
                  >
                    <Reddit className="mx-1" /> Reddit
                  </Button>
                )}
                {crypto.links.repos_url.github[0] && (
                  <Button
                    className="d-flex align-items-center"
                    variant="light"
                    size="sm"
                    href={crypto.links.repos_url.github[0]}
                    target="_blank"
                  >
                    <Github className="mx-1" /> Github
                  </Button>
                )}
                {crypto.links.homepage[0] && (
                  <Button
                    className="d-flex align-items-center"
                    variant="light"
                    size="sm"
                    href={crypto.links.homepage[0]}
                    target="_blank"
                  >
                    Official Website
                  </Button>
                )}
              </div>
            </div>
            <div className="item-range">
              <ProgressBar
                className="item-progress"
                variant="dark"
                min={crypto.market_data.low_24hr.usd}
                max={crypto.market_data.high_24hr.usd}
                now={crypto.market_data.current_price.usd}
              />
              <div className="d-flex justify-content-between mt-1">
                <span className="fw-semibold">
                  {formatCurrency(crypto.market_data.high_24hr.usd)}
                </span>
                <span>24hr Range</span>
                <span className="fw-semibold">
                  {formatCurrency(crypto.market_data.low_24hr.usd)}
                </span>
              </div>
            </div>
            <div className="table_list">
              <ul>
                {crypto.market_data.market_cap.usd && (
                  <li className="table_list_item">
                    <span className="table_list_title">Market Cap </span>
                    <span className="table_list_value">
                      {formatCurrency(crypto.market_data.market_cap.usd)}
                    </span>
                  </li>
                )}
                {crypto.market_data.total_volume.usd && (
                  <li className="table_list_item">
                    <span className="table_list_title">
                      24 Hour Trading Volume{" "}
                    </span>
                    <span className="table_list_value">
                      {formatCurrency(crypto.market_data.total_vol.usd)}
                    </span>
                  </li>
                )}
                {crypto.market_data.fully_diluted_volume.usd && (
                  <li className="table_list_item">
                    <span className="table_list_title">
                      Fully Diluted Valuation{" "}
                    </span>
                    <span className="table_list_value">
                      {formatCurrency(
                        crypto.market_data.fully_diluted_volume.usd
                      )}
                    </span>
                  </li>
                )}
              </ul>
              <ul>
                <li className="table_list_item">
                  <span className="table_list_title">Circulating Supply </span>
                  <span className="table_list_value">
                    {formatNumber(crypto.market_data.circulating_supply)}
                  </span>
                </li>
                <li className="table_list_item">
                  <span className="table_list_title">Total Supply </span>
                  <span className="table_list_value">
                    {crypto.market_data.total_supply
                      ? formatNumber(crypto.market_data.total_supply)
                      : "∞"}
                  </span>
                </li>
                {crypto.market_data.total_supply && (
                  <li className="table_list_item">
                    <span className="table_list_title">Max Supply </span>
                    <span className="table_list_value">
                      {formatNumber(crypto.market_data.circulating_supply)}
                    </span>
                  </li>
                )}
              </ul>
            </div>
            {crypto.description.en && (
              <div
                className="item_text"
                dangerouslySetInnerHTML={{ __html: crypto.description.en }}
              />
            )}
          </div>
        ) : (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "300px" }}
          >
            <Spinner animation="border" />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalDetail;
