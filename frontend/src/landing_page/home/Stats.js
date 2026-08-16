import React from "react";

function Stats() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 mt-5 p-5">
          <h1>Trust with confidence</h1>
          <h4 className="mt-5">Customer-first always</h4>
          <p className="mt-1 text-muted">
            That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores
            of equity investments, making us India’s largest broker;
            contributing to 15% of daily retail exchange volumes in India.
          </p>
          <h4 className="mt-5">No spam or gimmicks</h4>
          <p className="mt-1 text-muted">
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like. Our
            philosophies.
          </p>
          <h4 className="mt-5">The Zerodha universe</h4>
          <p className="mt-1 text-muted">
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>
          <h4 className="mt-5">Do better with money</h4>
          <p className="mt-1 text-muted">
            With initiatives like Nudge and Kill Switch, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>

        <div className="col-6">
          <img
            src="media\images\ecosystem.png"
            style={{ width: "105%" }}
            alt="Stats-Image"
            className="p-4"
          />

          <div className="d-flex ps-5 text-muted mt-2">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="fs-5 ps-5 ms-5"
              style={{ textDecoration: "none" }}
            >
              Explore our products <i class="fa fa-angle-double-right " aria-hidden="true"></i>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="fs-5 ms-5"
              style={{ textDecoration: "none" }}
            >
              Try Kite demo <i class="fa fa-angle-double-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
