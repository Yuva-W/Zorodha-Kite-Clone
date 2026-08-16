import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const navigate = useNavigate();

  const [funds, setFunds] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     FETCH DASHBOARD DATA
  ========================= */

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [fundsRes, holdingsRes, ordersRes] =
        await Promise.all([
          axios.get("http://localhost:3002/funds"),
          axios.get("http://localhost:3002/allholdings"),
          axios.get("http://localhost:3002/allOrders"),
        ]);

      setFunds(fundsRes.data);
      setHoldings(holdingsRes.data);
      setOrders(ordersRes.data);

      setLoading(false);
    } catch (err) {
      console.error("Dashboard data error:", err);

      setError("Unable to load dashboard data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);


  /* =========================
     CALCULATIONS
  ========================= */

  const availableBalance =
    Number(funds?.availableBalance || 0);

  const investedValue = holdings.reduce(
    (total, item) =>
      total +
      Number(item.avg || 0) *
        Number(item.qty || 0),
    0
  );

  const currentValue = holdings.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.qty || 0),
    0
  );

  const totalPnL =
    currentValue - investedValue;

  const pnlPercentage =
    investedValue > 0
      ? (totalPnL / investedValue) * 100
      : 0;


  /* =========================
     FORMAT
  ========================= */

  const formatMoney = (value) =>
    Number(value || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );


  const formatShortMoney = (value) => {
    value = Number(value || 0);

    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}Cr`;
    }

    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    }

    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(2)}K`;
    }

    return `₹${value.toFixed(2)}`;
  };


  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="summary-loading">

        <div className="loading-spinner"></div>

        <span>
          Loading portfolio...
        </span>

      </div>
    );
  }


  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div className="summary-error">

        <div className="summary-error-icon">
          !
        </div>

        <h2>
          Unable to load dashboard
        </h2>

        <p>
          {error}
        </p>

        <button
          onClick={fetchDashboardData}
          className="summary-retry-btn"
        >
          Try Again
        </button>

      </div>
    );
  }


  return (
    <div className="summary-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="summary-header">

        <div>

          <p className="summary-greeting">
            Overview
          </p>

          <h1>
            Hi, User!
          </h1>

          <p className="summary-subtitle">
            Here's what's happening with your
            portfolio today.
          </p>

        </div>


        <div className="market-status">

          <span className="status-dot"></span>

          Market Open

        </div>

      </div>


      {/* =========================
          PORTFOLIO CARDS
      ========================= */}

      <div className="summary-cards">


        {/* EQUITY */}

        <div className="summary-card">

          <div className="card-top">

            <div>

              <p className="card-label">
                Equity
              </p>

              <p className="card-description">
                Available margin
              </p>

            </div>

            <div className="card-icon blue-icon">
              ₹
            </div>

          </div>


          <h2>
            {formatShortMoney(
              availableBalance
            )}
          </h2>


          <div className="card-footer">

            <span>
              Available balance
            </span>

            <strong>
              ₹{formatMoney(availableBalance)}
            </strong>

          </div>

        </div>


        {/* HOLDINGS */}

        <div className="summary-card">

          <div className="card-top">

            <div>

              <p className="card-label">
                Holdings
              </p>

              <p className="card-description">
                Portfolio value
              </p>

            </div>

            <div className="card-icon purple-icon">
              ↗
            </div>

          </div>


          <h2>
            {formatShortMoney(
              currentValue
            )}
          </h2>


          <div className="card-footer">

            <span>
              Investment
            </span>

            <strong>
              {formatShortMoney(
                investedValue
              )}
            </strong>

          </div>

        </div>


        {/* P&L */}

        <div className="summary-card">

          <div className="card-top">

            <div>

              <p className="card-label">
                Total P&L
              </p>

              <p className="card-description">
                Overall returns
              </p>

            </div>

            <div className="card-icon green-icon">
              %
            </div>

          </div>


          <h2
            className={
              totalPnL >= 0
                ? "profit-value"
                : "loss-value"
            }
          >
            {totalPnL >= 0 ? "+" : "-"}
            {formatShortMoney(
              Math.abs(totalPnL)
            )}
          </h2>


          <div className="card-footer">

            <span>
              Returns
            </span>

            <strong
              className={
                totalPnL >= 0
                  ? "profit-text"
                  : "loss-text"
              }
            >
              {totalPnL >= 0 ? "+" : ""}
              {pnlPercentage.toFixed(2)}%
            </strong>

          </div>

        </div>

      </div>


      {/* =========================
          PORTFOLIO OVERVIEW
      ========================= */}

      <div className="portfolio-section">

        <div className="section-heading">

          <div>

            <h2>
              Portfolio Overview
            </h2>

            <p>
              Your investment summary
            </p>

          </div>


          <button
            className="view-btn"
            onClick={() =>
              navigate("/holdings")
            }
          >
            View Holdings →
          </button>

        </div>


        <div className="portfolio-grid">


          {/* PERFORMANCE */}

          <div className="portfolio-chart-card">

            <div className="chart-header">

              <div>

                <h3>
                  Portfolio Performance
                </h3>

                <p>
                  Current portfolio value
                </p>

              </div>


              <span className="chart-value">

                {formatShortMoney(
                  currentValue
                )}

              </span>

            </div>


            {/* Simple visual */}

            <div className="chart-placeholder">

              <div className="chart-grid-lines">

                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>


              <div className="portfolio-bar-chart">

                {holdings
                  .slice(0, 8)
                  .map((item, index) => {

                    const value =
                      Number(item.price || 0) *
                      Number(item.qty || 0);

                    const maxValue = Math.max(
                      ...holdings.map(
                        (h) =>
                          Number(h.price || 0) *
                          Number(h.qty || 0)
                      ),
                      1
                    );

                    const height =
                      Math.max(
                        15,
                        (value / maxValue) * 100
                      );

                    return (
                      <div
                        className="portfolio-bar"
                        key={
                          item._id || index
                        }
                      >
                        <div
                          style={{
                            height: `${height}%`,
                          }}
                        ></div>

                        <span>
                          {item.name}
                        </span>

                      </div>
                    );
                  })}

              </div>

            </div>

          </div>


          {/* QUICK STATS */}

          <div className="quick-stats-card">

            <h3>
              Quick Stats
            </h3>


            <div className="quick-stat">

              <div>

                <span className="stat-name">
                  Invested
                </span>

                <span className="stat-value">
                  {formatShortMoney(
                    investedValue
                  )}
                </span>

              </div>

              <span
                className={
                  totalPnL >= 0
                    ? "stat-positive"
                    : "stat-negative"
                }
              >
                {totalPnL >= 0 ? "+" : ""}
                {pnlPercentage.toFixed(2)}%
              </span>

            </div>


            <div className="quick-stat">

              <div>

                <span className="stat-name">
                  Current Value
                </span>

                <span className="stat-value">
                  {formatShortMoney(
                    currentValue
                  )}
                </span>

              </div>

              <span
                className={
                  totalPnL >= 0
                    ? "stat-positive"
                    : "stat-negative"
                }
              >
                {totalPnL >= 0 ? "+" : "-"}
                {formatShortMoney(
                  Math.abs(totalPnL)
                )}
              </span>

            </div>


            <div className="quick-stat">

              <div>

                <span className="stat-name">
                  Holdings
                </span>

                <span className="stat-value">
                  {holdings.length} Stocks
                </span>

              </div>

              <span className="stat-neutral">
                Active
              </span>

            </div>


            <div className="quick-stat">

              <div>

                <span className="stat-name">
                  Margin
                </span>

                <span className="stat-value">
                  ₹{formatMoney(
                    availableBalance
                  )}
                </span>

              </div>

              <span className="stat-neutral">
                Available
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          RECENT ACTIVITY
      ========================= */}

      <div className="activity-section">

        <div className="section-heading">

          <div>

            <h2>
              Recent Activity
            </h2>

            <p>
              Your latest trading activity
            </p>

          </div>

        </div>


        <div className="activity-card">

          {orders.length > 0 ? (

            <>

              <div
                className={
                  orders[orders.length - 1]
                    ?.mode
                    ?.toLowerCase() === "buy"
                    ? "activity-icon buy-activity"
                    : "activity-icon sell-activity"
                }
              >
                {orders[
                  orders.length - 1
                ]?.mode
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>


              <div className="activity-info">

                <strong>

                  {orders[
                    orders.length - 1
                  ]?.mode}{" "}
                  order placed

                </strong>

                <span>

                  {orders[
                    orders.length - 1
                  ]?.name}{" "}

                  ·{" "}

                  {orders[
                    orders.length - 1
                  ]?.qty} qty

                  {" "}at{" "}

                  ₹
                  {Number(
                    orders[
                      orders.length - 1
                    ]?.price || 0
                  ).toFixed(2)}

                </span>

              </div>


              <span className="activity-time">
                Recent
              </span>

            </>

          ) : (

            <>

              <div className="activity-icon buy-activity">
                ✓
              </div>

              <div className="activity-info">

                <strong>
                  Portfolio is ready
                </strong>

                <span>
                  Your holdings are currently worth{" "}
                  {formatShortMoney(
                    currentValue
                  )}
                </span>

              </div>

              <span className="activity-time">
                Today
              </span>

            </>

          )}

        </div>

      </div>


    </div>
  );
};

export default Summary;