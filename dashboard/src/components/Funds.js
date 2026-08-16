import React, { useEffect, useState } from "react";
import axios from "axios";

const Funds = () => {
  const [funds, setFunds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFunds = () => {
    setLoading(true);
    setError("");

    axios
      .get("http://localhost:3002/funds")
      .then((res) => {
        setFunds(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching funds:", err);
        setError("Unable to load funds");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  const formatMoney = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const available = Number(funds?.availableBalance || 0);
  const used = Number(funds?.usedMargin || 0);
  const opening = Number(funds?.openingBalance || 0);

  const totalFunds = available + used;

  const availablePercentage =
    totalFunds > 0
      ? (available / totalFunds) * 100
      : 0;

  const usedPercentage =
    totalFunds > 0
      ? (used / totalFunds) * 100
      : 0;

  return (
    <div className="funds-page">

      {/* Header */}

      <div className="funds-header">

        <div>
          <p className="page-eyebrow">
            Account
          </p>

          <h1>
            Funds
          </h1>

          <p className="page-subtitle">
            Manage your trading balance and available margin.
          </p>
        </div>

        <div className="funds-status">
          <span></span>
          Account Active
        </div>

      </div>

      {/* Loading */}

      {loading && (

        <div className="funds-loading">
          <div className="loading-spinner"></div>
          <span>Loading funds...</span>
        </div>

      )}

      {/* Error */}

      {!loading && error && (

        <div className="funds-error">

          <div className="funds-error-icon">
            !
          </div>

          <h2>
            Unable to load funds
          </h2>

          <p>
            {error}
          </p>

          <button
            className="funds-refresh-btn"
            onClick={fetchFunds}
          >
            Try Again
          </button>

        </div>

      )}

      {/* Content */}

      {!loading && !error && funds && (

        <>

          {/* Summary cards */}

          <div className="funds-summary">

            <div className="fund-summary-card primary-fund">

              <div className="fund-card-top">
                <span>
                  Available Balance
                </span>

                <div className="fund-card-icon">
                  ₹
                </div>
              </div>

              <strong>
                ₹{formatMoney(available)}
              </strong>

              <small>
                Available for trading
              </small>

            </div>


            <div className="fund-summary-card">

              <div className="fund-card-top">
                <span>
                  Used Margin
                </span>

                <div className="fund-card-icon used-icon">
                  ↗
                </div>
              </div>

              <strong>
                ₹{formatMoney(used)}
              </strong>

              <small>
                Currently utilized
              </small>

            </div>


            <div className="fund-summary-card">

              <div className="fund-card-top">
                <span>
                  Opening Balance
                </span>

                <div className="fund-card-icon opening-icon">
                  ◷
                </div>
              </div>

              <strong>
                ₹{formatMoney(opening)}
              </strong>

              <small>
                Starting balance
              </small>

            </div>

          </div>


          {/* Account overview */}

          <div className="funds-main-grid">

            {/* Balance overview */}

            <div className="funds-overview-card">

              <div className="funds-card-header">

                <div>
                  <h2>
                    Account Overview
                  </h2>

                  <p>
                    Current allocation of your trading funds
                  </p>
                </div>

                <button
                  className="funds-refresh-btn"
                  onClick={fetchFunds}
                >
                  Refresh
                </button>

              </div>


              <div className="funds-total">

                <span>
                  Total Funds
                </span>

                <strong>
                  ₹{formatMoney(totalFunds)}
                </strong>

              </div>


              {/* Progress */}

              <div className="fund-progress">

                <div className="progress-track">

                  <div
                    className="progress-available"
                    style={{
                      width: `${availablePercentage}%`,
                    }}
                  ></div>

                  <div
                    className="progress-used"
                    style={{
                      width: `${usedPercentage}%`,
                    }}
                  ></div>

                </div>

                <div className="progress-labels">

                  <span>
                    Available
                    <strong>
                      {availablePercentage.toFixed(1)}%
                    </strong>
                  </span>

                  <span>
                    Used
                    <strong>
                      {usedPercentage.toFixed(1)}%
                    </strong>
                  </span>

                </div>

              </div>


              {/* Breakdown */}

              <div className="fund-breakdown">

                <div className="fund-breakdown-row">

                  <div>
                    <span className="fund-dot available-dot"></span>

                    <span>
                      Available Balance
                    </span>
                  </div>

                  <strong>
                    ₹{formatMoney(available)}
                  </strong>

                </div>


                <div className="fund-breakdown-row">

                  <div>
                    <span className="fund-dot used-dot"></span>

                    <span>
                      Used Margin
                    </span>
                  </div>

                  <strong>
                    ₹{formatMoney(used)}
                  </strong>

                </div>


                <div className="fund-breakdown-row">

                  <div>
                    <span className="fund-dot opening-dot"></span>

                    <span>
                      Opening Balance
                    </span>
                  </div>

                  <strong>
                    ₹{formatMoney(opening)}
                  </strong>

                </div>

              </div>

            </div>


            {/* Quick information */}

            <div className="fund-info-card">

              <div className="fund-info-header">

                <h2>
                  Fund Summary
                </h2>

                <div className="fund-summary-icon">
                  ₹
                </div>

              </div>


              <div className="fund-info-item">

                <span>
                  Available to trade
                </span>

                <strong className="fund-positive">
                  ₹{formatMoney(available)}
                </strong>

              </div>


              <div className="fund-info-item">

                <span>
                  Margin utilized
                </span>

                <strong>
                  ₹{formatMoney(used)}
                </strong>

              </div>


              <div className="fund-info-item">

                <span>
                  Total account funds
                </span>

                <strong>
                  ₹{formatMoney(totalFunds)}
                </strong>

              </div>


              <div className="fund-info-note">

                <span>✓</span>

                <p>
                  Your available balance can be used
                  for new trades.
                </p>

              </div>

            </div>

          </div>

        </>

      )}

    </div>
  );
};

export default Funds;