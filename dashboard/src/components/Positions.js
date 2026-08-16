import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     FETCH POSITIONS
  ========================= */

  const fetchPositions = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        "http://localhost:3002/allPositions"
      );

      setPositions(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching positions:", err);

      setError("Unable to load positions");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);


  /* =========================
     CALCULATIONS
  ========================= */

  const investedValue = useMemo(() => {
    return positions.reduce(
      (total, position) =>
        total +
        Number(position.avg || 0) *
          Number(position.qty || 0),
      0
    );
  }, [positions]);


  const currentValue = useMemo(() => {
    return positions.reduce(
      (total, position) =>
        total +
        Number(position.price || 0) *
          Number(position.qty || 0),
      0
    );
  }, [positions]);


  const totalPnL =
    currentValue - investedValue;


  const pnlPercentage =
    investedValue > 0
      ? (totalPnL / investedValue) * 100
      : 0;


  /* =========================
     PROFIT / LOSS POSITIONS
  ========================= */

  const profitablePositions =
    positions.filter((position) => {

      const pnl =
        (Number(position.price || 0) -
          Number(position.avg || 0)) *
        Number(position.qty || 0);

      return pnl >= 0;

    }).length;


  const losingPositions =
    positions.length -
    profitablePositions;


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
      <div className="positions-loading-page">

        <div className="loading-spinner"></div>

        <span>
          Loading positions...
        </span>

      </div>
    );
  }


  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div className="positions-error">

        <div className="positions-error-icon">
          !
        </div>

        <h2>
          Unable to load positions
        </h2>

        <p>
          {error}
        </p>

        <button
          className="positions-retry-btn"
          onClick={fetchPositions}
        >
          Try Again
        </button>

      </div>
    );
  }


  return (
    <div className="positions-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="positions-header">

        <div>

          <p className="page-eyebrow">
            Trading
          </p>

          <h1>

            Positions

            <span className="positions-count">
              {positions.length}
            </span>

          </h1>

          <p className="page-subtitle">
            Monitor your open trading positions
            and P&L.
          </p>

        </div>


        <div className="positions-status">

          <span></span>

          Market Open

        </div>

      </div>


      {/* =========================
          SUMMARY
      ========================= */}

      <div className="positions-summary">


        {/* Open positions */}

        <div className="position-stat-card">

          <div className="position-card-top">

            <span>
              Open Positions
            </span>

            <div className="position-card-icon blue">
              #
            </div>

          </div>

          <strong>
            {positions.length}
          </strong>

          <small>
            {profitablePositions} profitable
            {" · "}
            {losingPositions} losing
          </small>

        </div>


        {/* Invested */}

        <div className="position-stat-card">

          <div className="position-card-top">

            <span>
              Invested Value
            </span>

            <div className="position-card-icon purple">
              ₹
            </div>

          </div>

          <strong>
            {formatShortMoney(
              investedValue
            )}
          </strong>

          <small>
            Total investment
          </small>

        </div>


        {/* Current */}

        <div className="position-stat-card">

          <div className="position-card-top">

            <span>
              Current Value
            </span>

            <div className="position-card-icon cyan">
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

        <div className="position-stat-card">

          <div className="position-card-top">

            <span>
              Total P&L
            </span>

            <div
              className={
                totalPnL >= 0
                  ? "position-card-icon green"
                  : "position-card-icon red"
              }
            >
              %
            </div>

          </div>

          <strong
            className={
              totalPnL >= 0
                ? "position-profit"
                : "position-loss"
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
                ? "position-profit"
                : "position-loss"
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
          POSITIONS TABLE
      ========================= */}

      <div className="positions-card">

        <div className="positions-card-header">

          <div>

            <h2>
              Open Positions
            </h2>

            <p>
              Live positions from your trading
              account
            </p>

          </div>


          <button
            className="table-action"
            onClick={fetchPositions}
          >
            Refresh
          </button>

        </div>


        {positions.length === 0 ? (

          <div className="positions-empty">

            <div className="positions-empty-icon">
              ↗
            </div>

            <h2>
              No open positions
            </h2>

            <p>
              You currently don't have any open
              trading positions.
            </p>

          </div>

        ) : (

          <div className="positions-table-wrapper">

            <table className="positions-table">

              <thead>

                <tr>

                  <th>
                    Instrument
                  </th>

                  <th>
                    Product
                  </th>

                  <th>
                    Qty.
                  </th>

                  <th>
                    Avg. Price
                  </th>

                  <th>
                    LTP
                  </th>

                  <th>
                    Current Value
                  </th>

                  <th>
                    Net Chg.
                  </th>

                  <th>
                    Day Chg.
                  </th>

                  <th>
                    P&L
                  </th>

                </tr>

              </thead>


              <tbody>

                {positions.map(
                  (position, index) => {

                    const qty =
                      Number(
                        position.qty || 0
                      );

                    const avg =
                      Number(
                        position.avg || 0
                      );

                    const price =
                      Number(
                        position.price || 0
                      );


                    const invested =
                      avg * qty;

                    const value =
                      price * qty;

                    const pnl =
                      value - invested;

                    const isProfit =
                      pnl >= 0;


                    const netValue =
                      parseFloat(
                        String(
                          position.net || ""
                        ).replace(
                          "%",
                          ""
                        )
                      );


                    return (

                      <tr
                        key={
                          position._id ||
                          index
                        }
                      >

                        {/* Instrument */}

                        <td>

                          <div className="position-instrument">

                            <div
                              className={
                                isProfit
                                  ? "position-icon position-profit-icon"
                                  : "position-icon position-loss-icon"
                              }
                            >
                              {position.name?.charAt(
                                0
                              )}
                            </div>


                            <div>

                              <strong>
                                {position.name}
                              </strong>

                              <span>
                                NSE
                              </span>

                            </div>

                          </div>

                        </td>


                        {/* Product */}

                        <td>

                          <span className="product-badge">

                            {position.product ||
                              "CNC"}

                          </span>

                        </td>


                        {/* Quantity */}

                        <td>
                          {qty}
                        </td>


                        {/* Average */}

                        <td>
                          ₹
                          {avg.toFixed(2)}
                        </td>


                        {/* LTP */}

                        <td>
                          ₹
                          {price.toFixed(2)}
                        </td>


                        {/* Current value */}

                        <td>
                          ₹
                          {formatMoney(value)}
                        </td>


                        {/* Net */}

                        <td
                          className={
                            netValue >= 0
                              ? "profit"
                              : "loss"
                          }
                        >

                          {position.net}

                        </td>


                        {/* Day */}

                        <td
                          className={
                            position.isLoss
                              ? "loss"
                              : "profit"
                          }
                        >

                          {position.day}

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

                      </tr>

                    );

                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default Positions;