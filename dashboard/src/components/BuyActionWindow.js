import React, { useContext, useState } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);

  const generalContext = useContext(GeneralContext);

  const isBuy = mode === "BUY";

  const handleOrderClick = async () => {
    if (stockQuantity <= 0 || stockPrice <= 0) {
      alert("Quantity and price must be greater than 0");
      return;
    }

    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: mode,
      });

      alert(`${mode} order placed successfully`);

      generalContext.closeBuyWindow();

    } catch (err) {
      console.error("Order error:", err);

      alert("Failed to place order");
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window">

      {/* Header */}

      <div className="order-window-header">

        <div>
          <span className="order-window-label">
            {isBuy ? "BUY ORDER" : "SELL ORDER"}
          </span>

          <h2>
            {uid}
          </h2>
        </div>

        <button
          className="order-close"
          onClick={handleCancelClick}
        >
          ×
        </button>

      </div>

      {/* Inputs */}

      <div className="regular-order">

        <div className="inputs">

          <fieldset>
            <legend>Qty.</legend>

            <input
              type="number"
              min="1"
              value={stockQuantity}
              onChange={(e) =>
                setStockQuantity(e.target.value)
              }
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>

            <input
              type="number"
              min="0"
              step="0.05"
              value={stockPrice}
              onChange={(e) =>
                setStockPrice(e.target.value)
              }
            />
          </fieldset>

        </div>

      </div>

      {/* Footer */}

      <div className="buttons">

        <span>
          {isBuy
            ? "Funds required for purchase"
            : "Sell quantity from your position"}
        </span>

        <div>

          <button
            className={
              isBuy
                ? "btn btn-blue"
                : "btn btn-red"
            }
            onClick={handleOrderClick}
          >
            {isBuy ? "Buy" : "Sell"}
          </button>

          <button
            className="btn btn-grey"
            onClick={handleCancelClick}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
};

export default BuyActionWindow;