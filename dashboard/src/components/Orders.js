import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders from backend
  const fetchOrders = () => {
    setLoading(true);
    setError("");

    axios
      .get("http://localhost:3002/allOrders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError("Unable to load orders");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Order calculations
  const totalOrders = orders.length;

  const buyOrders = orders.filter(
    (order) => order.mode?.toLowerCase() === "buy"
  ).length;

  const sellOrders = orders.filter(
    (order) => order.mode?.toLowerCase() === "sell"
  ).length;

  const totalValue = orders.reduce(
    (total, order) =>
      total + Number(order.price) * Number(order.qty),
    0
  );

  const formatMoney = (value) =>
    Number(value).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  return (
    <div className="orders-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="orders-header">

        <div>
          <p className="page-eyebrow">
            Trading
          </p>

          <h1>
            Orders
            <span className="orders-count">
              {totalOrders}
            </span>
          </h1>

          <p className="page-subtitle">
            Track and manage your recent orders.
          </p>
        </div>

        <div className="orders-status">
          <span></span>
          Market Open
        </div>

      </div>


      {/* =========================
          SUMMARY CARDS
      ========================= */}

      <div className="orders-summary">

        <div className="order-stat-card">

          <span>
            Total Orders
          </span>

          <strong>
            {totalOrders}
          </strong>

          <small>
            All orders
          </small>

        </div>


        <div className="order-stat-card">

          <span>
            Buy Orders
          </span>

          <strong className="profit">
            {buyOrders}
          </strong>

          <small>
            Buy transactions
          </small>

        </div>


        <div className="order-stat-card">

          <span>
            Sell Orders
          </span>

          <strong className="loss">
            {sellOrders}
          </strong>

          <small>
            Sell transactions
          </small>

        </div>


        <div className="order-stat-card">

          <span>
            Order Value
          </span>

          <strong>
            ₹{formatMoney(totalValue)}
          </strong>

          <small>
            Total traded value
          </small>

        </div>

      </div>


      {/* =========================
          ORDERS CARD
      ========================= */}

      <div className="orders-card">

        <div className="orders-card-header">

          <div>
            <h2>
              Recent Orders
            </h2>

            <p>
              Orders fetched from your trading account
            </p>
          </div>

          <button
            className="table-action"
            onClick={fetchOrders}
          >
            Refresh
          </button>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="orders-loading">

            <div className="loading-spinner"></div>

            <span>
              Loading orders...
            </span>

          </div>

        )}


        {/* ERROR */}

        {!loading && error && (

          <div className="orders-empty">

            <div className="orders-empty-icon">
              !
            </div>

            <h2>
              Unable to load orders
            </h2>

            <p>
              {error}
              <br />
              Make sure your backend is running.
            </p>

            <button
              className="place-order-btn"
              onClick={fetchOrders}
            >
              Try Again
            </button>

          </div>

        )}


        {/* NO ORDERS */}

        {!loading &&
          !error &&
          orders.length === 0 && (

            <div className="orders-empty">

              <div className="orders-empty-icon">
                ↗
              </div>

              <h2>
                No orders yet
              </h2>

              <p>
                You haven't placed any orders yet.
                <br />
                Your orders will appear here.
              </p>

              <button
                className="place-order-btn"
                onClick={() => navigate("/")}
              >
                Place an Order
                <span>→</span>
              </button>

            </div>

          )}


        {/* ORDERS TABLE */}

        {!loading &&
          !error &&
          orders.length > 0 && (

            <div className="orders-table-wrapper">

              <table className="orders-table">

                <thead>

                  <tr>
                    <th>Instrument</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Order Value</th>
                  </tr>

                </thead>


                <tbody>

                  {orders.map((order, index) => {

                    const orderValue =
                      Number(order.price) *
                      Number(order.qty);

                    const isBuy =
                      order.mode?.toLowerCase() ===
                      "buy";

                    return (

                      <tr key={order._id || index}>

                        {/* Instrument */}

                        <td>

                          <div className="order-instrument">

                            <div
                              className={
                                isBuy
                                  ? "order-icon order-buy"
                                  : "order-icon order-sell"
                              }
                            >
                              {order.name?.charAt(0)}
                            </div>

                            <div>
                              <strong>
                                {order.name}
                              </strong>

                              <span>
                                NSE
                              </span>
                            </div>

                          </div>

                        </td>


                        {/* Buy / Sell */}

                        <td>

                          <span
                            className={
                              isBuy
                                ? "order-type buy-type"
                                : "order-type sell-type"
                            }
                          >
                            {order.mode}
                          </span>

                        </td>


                        {/* Quantity */}

                        <td>
                          {order.qty}
                        </td>


                        {/* Price */}

                        <td>
                          ₹
                          {Number(order.price).toFixed(2)}
                        </td>


                        {/* Value */}

                        <td>
                          ₹
                          {formatMoney(orderValue)}
                        </td>

                      </tr>

                    );
                  })}

                </tbody>

              </table>

            </div>

          )}

      </div>

    </div>
  );
};

export default Orders;