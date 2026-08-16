import React, { useContext, useState } from "react";

import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";

const WatchList = () => {
  const [search, setSearch] = useState("");

  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="watchlist-container">

      {/* Header */}

      <div className="watchlist-header">

        <div>
          <h2>Watchlist</h2>

          <span>
            {watchlist.length} / 50 stocks
          </span>
        </div>

      </div>


      {/* Search */}

      <div className="watchlist-search">

        <span className="search-icon">
          ⌕
        </span>

        <input
          type="text"
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span className="search-shortcut">
          /
        </span>

      </div>


      {/* List */}

      <div className="watchlist-list">

        {filteredWatchlist.length === 0 ? (

          <div className="watchlist-no-results">
            No stocks found
          </div>

        ) : (

          filteredWatchlist.map((stock, index) => (

            <WatchListItem
              stock={stock}
              key={index}
            />

          ))

        )}

      </div>


      {/* Footer */}

      <div className="watchlist-footer">

        <span>
          {filteredWatchlist.length} stocks
        </span>

        <span>
          NSE
        </span>

      </div>

    </div>
  );
};

export default WatchList;


/* =========================================
   WATCHLIST ITEM
========================================= */

const WatchListItem = ({ stock }) => {

  const [showActions, setShowActions] =
    useState(false);

  return (

    <div
      className="modern-watch-item"

      onMouseEnter={() =>
        setShowActions(true)
      }

      onMouseLeave={() =>
        setShowActions(false)
      }
    >

      {/* Stock */}

      <div className="watch-stock-info">

        <div
          className={
            stock.isDown
              ? "watch-stock-logo watch-loss"
              : "watch-stock-logo watch-profit"
          }
        >
          {stock.name.charAt(0)}
        </div>

        <div className="watch-stock-name">

          <strong>
            {stock.name}
          </strong>

          <span>
            NSE
          </span>

        </div>

      </div>


      {/* Price */}

      {!showActions && (

        <div className="watch-price">

          <span
            className={
              stock.isDown
                ? "watch-loss-text"
                : "watch-profit-text"
            }
          >
            {stock.percent}
          </span>

          {stock.isDown ? (
            <KeyboardArrowDown className="watch-loss-text" />
          ) : (
            <KeyboardArrowUp className="watch-profit-text" />
          )}

          <strong>
            ₹{stock.price}
          </strong>

        </div>

      )}


      {/* Actions */}

      {showActions && (
        <WatchListActions uid={stock.name} />
      )}

    </div>
  );
};


/* =========================================
   ACTIONS
========================================= */

const WatchListActions = ({ uid }) => {

  const generalContext =
    useContext(GeneralContext);


  const handleBuyClick = () => {

    generalContext.openBuyWindow(uid);

  };


  const handleSellClick = () => {

    generalContext.openSellWindow(uid);

  };


  return (

    <div className="modern-watch-actions">

      {/* BUY */}

      <Tooltip
        title="Buy"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >

        <button
          className="watch-buy"
          onClick={handleBuyClick}
        >
          Buy
        </button>

      </Tooltip>


      {/* SELL */}

      <Tooltip
        title="Sell"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >

        <button
          className="watch-sell"
          onClick={handleSellClick}
        >
          Sell
        </button>

      </Tooltip>


      {/* ANALYTICS */}

      <Tooltip
        title="Analytics"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >

        <button
          className="watch-action-btn"
        >
          <BarChartOutlined />
        </button>

      </Tooltip>


      {/* MORE */}

      <Tooltip
        title="More"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >

        <button
          className="watch-action-btn"
        >
          <MoreHoriz />
        </button>

      </Tooltip>

    </div>
  );
};