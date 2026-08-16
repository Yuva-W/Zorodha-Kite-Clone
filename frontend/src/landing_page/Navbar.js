import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar-container bg-light p-3">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
          <div>
            <Link to="/">
              <img
                src="media/images/logo.svg"
                style={{ width: "30%" }}
                alt="Logo"
                className="navbar-brand ms-5"
              />
            </Link>
          </div>
          <div>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <Link class="nav-link active" aria-current="page" to="/signup">
                  SignUp
                </Link>
                <Link class="nav-link active ms-4" to="/about">
                  About
                </Link>
                <Link class="nav-link active ms-4" to="/product">
                  Product
                </Link>
                <Link class="nav-link active ms-4" to="/pricing">
                  Pricing
                </Link>
                <Link class="nav-link active ms-4" to="/support">
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
