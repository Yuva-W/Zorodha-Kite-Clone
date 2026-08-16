import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const COLORS = [
  "#2563eb",
  "#7c3aed",
  "#06b6d4",
  "#16a34a",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
  "#f97316",
];

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     FETCH HOLDINGS
  ========================= */

  const fetchHoldings = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        "http://localhost:3002/allholdings"
      );

      setAllHoldings(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching holdings:", err);
      setError("Unable to load holdings");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  /* =========================
     CALCULATIONS
  ========================= */

  const totalInvestment = useMemo(() => {
    return allHoldings.reduce(
      (total, stock) =>
        total +
        Number(stock.avg || 0) *
          Number(stock.qty || 0),
      0
    );
  }, [allHoldings]);

  const currentValue = useMemo(() => {
    return allHoldings.reduce(
      (total, stock) =>
        total +
        Number(stock.price || 0) *
          Number(stock.qty || 0),
      0
    );
  }, [allHoldings]);

  const totalPnL =
    currentValue - totalInvestment;

  const pnlPercentage =
    totalInvestment > 0
      ? (totalPnL / totalInvestment) * 100
      : 0;

  /* =========================
     DISTRIBUTION
  ========================= */

  const distribution = useMemo(() => {
    return allHoldings
      .map((stock, index) => {

        const value =
          Number(stock.price || 0) *
          Number(stock.qty || 0);

        const percentage =
          currentValue > 0
            ? (value / currentValue) * 100
            : 0;

        return {
          ...stock,
          value,
          percentage,
          color:
            COLORS[index % COLORS.length],
        };
      })
      .sort(
        (a, b) => b.value - a.value
      );
  }, [allHoldings, currentValue]);

  /* =========================
     DONUT
  ========================= */

  const donutBackground = useMemo(() => {

    if (!distribution.length) {
      return "#e5e7eb";
    }

    let degree = 0;

    const segments = distribution.map(
      (stock) => {

        const start = degree;

        const end =
          degree +
          stock.percentage * 3.6;

        degree = end;

        return `${stock.color} ${start}deg ${end}deg`;
      }
    );

    return `conic-gradient(${segments.join(", ")})`;

  }, [distribution]);

  /* =========================
     FORMAT
  ========================= */

  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  const formatShortMoney = (value) => {

    value = Number(value || 0);

    if (value >= 10000000) {
      return `₹${(
        value / 10000000
      ).toFixed(2)}Cr`;
    }

    if (value >= 100000) {
      return `₹${(
        value / 100000
      ).toFixed(2)}L`;
    }

    if (value >= 1000) {
      return `₹${(
        value / 1000
      ).toFixed(2)}K`;
    }

    return `₹${value.toFixed(2)}`;
  };


  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="holdings-loading">

        <div className="loading-spinner"></div>

        <span>
          Loading holdings...
        </span>

      </div>
    );
  }


  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div className="holdings-error">

        <div className="holdings-error-icon">
          !
        </div>

        <h2>
          Unable to load holdings
        </h2>

        <p>
          {error}
        </p>

        <button
          className="holdings-retry-btn"
          onClick={fetchHoldings}
        >
          Try Again
        </button>

      </div>
    );
  }


  return (
    <div className="holdings-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="holdings-header">

        <div>

          <p className="page-eyebrow">
            Portfolio
          </p>

          <h1>
            Holdings

            <span className="holdings-count">
              {allHoldings.length}
            </span>

          </h1>

          <p className="page-subtitle">
            Track your investments and portfolio
            performance.
          </p>

        </div>


        <div className="portfolio-status">

          <span></span>

          Portfolio Active

        </div>

      </div>


      {/* =========================
          SUMMARY CARDS
      ========================= */}

      <div className="holdings-summary">

        {/* Investment */}

        <div className="holding-summary-card">

          <div className="holding-card-top">

            <span>
              Total Investment
            </span>

            <div className="holding-card-icon blue">
              ₹
            </div>

          </div>

          <strong>
            {formatShortMoney(
              totalInvestment
            )}
          </strong>

          <small>
            Amount invested
          </small>

        </div>


        {/* Current */}

        <div className="holding-summary-card">

          <div className="holding-card-top">

            <span>
              Current Value
            </span>

            <div className="holding-card-icon purple">
              ↗
            </div>

          </div>

          <strong>
            {formatShortMoney(
              currentValue
            )}
          </strong>

          <small>
            Current market value
          </small>

        </div>


        {/* P&L */}

        <div className="holding-summary-card">

          <div className="holding-card-top">

            <span>
              Total P&L
            </span>

            <div
              className={
                totalPnL >= 0
                  ? "holding-card-icon green"
                  : "holding-card-icon red"
              }
            >
              %
            </div>

          </div>

          <strong
            className={
              totalPnL >= 0
                ? "holding-profit"
                : "holding-loss"
            }
          >
            {totalPnL >= 0
              ? "+"
              : "-"}
            {formatShortMoney(
              Math.abs(totalPnL)
            )}
          </strong>

          <small
            className={
              totalPnL >= 0
                ? "holding-profit"
                : "holding-loss"
            }
          >
            {totalPnL >= 0
              ? "+"
              : ""}
            {pnlPercentage.toFixed(2)}%
          </small>

        </div>

      </div>


      {/* =========================
          HOLDINGS TABLE
      ========================= */}

      <div className="holdings-table-card">

        <div className="holdings-table-header">

          <div>

            <h2>
              Your Holdings
            </h2>

            <p>
              {allHoldings.length} instruments
              in your portfolio
            </p>

          </div>

          <button
            className="table-action"
            onClick={fetchHoldings}
          >
            Refresh
          </button>

        </div>


        {allHoldings.length === 0 ? (

          <div className="holdings-empty">

            <div className="holdings-empty-icon">
              ↗
            </div>

            <h2>
              No holdings yet
            </h2>

            <p>
              Your investments will appear here.
            </p>

          </div>

        ) : (

          <div className="modern-holdings-table">

            <table>

              <thead>

                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Avg. Cost</th>
                  <th>LTP</th>
                  <th>Current Value</th>
                  <th>P&L</th>
                  <th>Net Chg.</th>
                  <th>Day Chg.</th>
                </tr>

              </thead>


              <tbody>

                {allHoldings.map(
                  (stock, index) => {

                    const invested =
                      Number(stock.avg || 0) *
                      Number(stock.qty || 0);

                    const value =
                      Number(stock.price || 0) *
                      Number(stock.qty || 0);

                    const pnl =
                      value - invested;

                    const isProfit =
                      pnl >= 0;

                    return (

                      <tr
                        key={
                          stock._id || index
                        }
                      >

                        {/* Instrument */}

                        <td>

                          <div className="instrument">

                            <div
                              className={
                                isProfit
                                  ? "instrument-icon instrument-profit"
                                  : "instrument-icon instrument-loss"
                              }
                            >
                              {stock.name?.charAt(0)}
                            </div>

                            <div>

                              <strong>
                                {stock.name}
                              </strong>

                              <span>
                                NSE
                              </span>

                            </div>

                          </div>

                        </td>


                        {/* Quantity */}

                        <td>
                          {stock.qty}
                        </td>


                        {/* Average */}

                        <td>
                          ₹
                          {Number(
                            stock.avg || 0
                          ).toFixed(2)}
                        </td>


                        {/* LTP */}

                        <td>
                          ₹
                          {Number(
                            stock.price || 0
                          ).toFixed(2)}
                        </td>


                        {/* Current value */}

                        <td>
                          ₹
                          {formatMoney(value)}
                        </td>


                        {/* P&L */}

                        <td
                          className={
                            isProfit
                              ? "profit"
                              : "loss"
                          }
                        >
                          {isProfit
                            ? "+"
                            : "-"}
                          ₹
                          {formatMoney(
                            Math.abs(pnl)
                          )}
                        </td>


                        {/* Net */}

                        <td
                          className={
                            Number(
                              String(
                                stock.net
                              ).replace(
                                "%",
                                ""
                              )
                            ) >= 0
                              ? "profit"
                              : "loss"
                          }
                        >
                          {stock.net}
                        </td>


                        {/* Day */}

                        <td
                          className={
                            stock.isLoss
                              ? "loss"
                              : "profit"
                          }
                        >
                          {stock.day}
                        </td>

                      </tr>

                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =========================
          PORTFOLIO DISTRIBUTION
      ========================= */}

      {allHoldings.length > 0 && (

        <div className="portfolio-distribution-card">

          {/* Header */}

          <div className="portfolio-distribution-header">

            <div>

              <p className="page-eyebrow">
                Allocation
              </p>

              <h2>
                Portfolio Distribution
              </h2>

              <p>
                How your current portfolio is
                distributed
              </p>

            </div>


            <div className="distribution-total">

              <span>
                Total value
              </span>

              <strong>
                {formatShortMoney(
                  currentValue
                )}
              </strong>

            </div>

          </div>


          {/* Distribution */}

          <div className="distribution-content">

            {/* Donut */}

            <div className="distribution-donut">

              <div
                className="donut"
                style={{
                  background:
                    donutBackground,
                }}
              >

                <div className="donut-center">

                  <span>
                    Portfolio
                  </span>

                  <strong>
                    {formatShortMoney(
                      currentValue
                    )}
                  </strong>

                  <small>
                    {allHoldings.length}
                    {" "}Stocks
                  </small>

                </div>

              </div>

            </div>


            {/* Breakdown */}

            <div className="distribution-list">

              {distribution.map(
                (stock, index) => (

                  <div
                    className="distribution-row"
                    key={
                      stock._id || index
                    }
                  >

                    <div className="distribution-stock">

                      <span
                        className="distribution-dot"
                        style={{
                          background:
                            stock.color,
                        }}
                      ></span>

                      <div>

                        <strong>
                          {stock.name}
                        </strong>

                        <span>
                          {stock.qty}
                          {" "}shares
                        </span>

                      </div>

                    </div>


                    <div className="distribution-value">

                      <strong>
                        ₹
                        {formatMoney(
                          stock.value
                        )}
                      </strong>

                      <span>
                        {stock.percentage.toFixed(
                          1
                        )}
                        %
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Holdings;