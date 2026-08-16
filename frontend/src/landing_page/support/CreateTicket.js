import React from "react";

function CreateTicket() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <div class="accordion accordion-flush " id="accordionFlushExample">
            <div class="accordion-item border rounded mt-2">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  <i class="fa fa-user" aria-hidden="true"></i>. Account Opening
                </button>
              </h2>

              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">1.Resident individual</div>
              </div>
              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">2.Minor</div>
              </div>
              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">3.Non Resident Indian (NRI)</div>
              </div>
              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  4.Company, Partnership, HUF and LLP
                </div>
              </div>
              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">5.Glossary</div>
              </div>
            </div>

            <div class="accordion-item border rounded mt-2">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  <i class="fa fa-address-card" aria-hidden="true"></i>. Your
                  Zorodha Account
                </button>
              </h2>

              <div
                id="flush-collapseTwo"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">1.Your Profile</div>
              </div>
              <div
                id="flush-collapseTwo"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">2.Account modification</div>
              </div>
              <div
                id="flush-collapseTwo"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  3.Client Master Report (CMR) and Depository Participant (DP)
                </div>
              </div>
              <div
                id="flush-collapseTwo"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">4.Nomination</div>
              </div>
              <div
                id="flush-collapseTwo"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  5.Transfer and conversion of securities
                </div>
              </div>
            </div>

            <div class="accordion-item border rounded mt-2">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  <i class="fa fa-circle-o-notch" aria-hidden="true"></i>. Kite
                </button>
              </h2>

              <div
                id="flush-collapseThree"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">1.IPO</div>
              </div>
              <div
                id="flush-collapseThree"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">2.Trading FAQs</div>
              </div>
              <div
                id="flush-collapseThree"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  3.Margin Trading Facility (MTF) and Margins
                </div>
              </div>
              <div
                id="flush-collapseThree"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">4.Alerts and Nudges</div>
              </div>
              <div
                id="flush-collapseThree"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">5.General</div>
              </div>
            </div>

            <div class="accordion-item border rounded mt-2">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapsefour"
                  aria-expanded="false"
                  aria-controls="flush-collapsefour"
                >
                  <i class="fa fa-usd" aria-hidden="true"></i>. Funds
                </button>
              </h2>

              <div
                id="flush-collapsefour"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">1.Add money</div>
              </div>
              <div
                id="flush-collapsefour"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">2.Withdraw money</div>
              </div>
              <div
                id="flush-collapsefour"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">3.Add bank accounts</div>
              </div>
              <div
                id="flush-collapsefour"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">4.eMandates</div>
              </div>
            </div>

            <div class="accordion-item border rounded mt-2">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive"
                >
                  <i class="fa fa-life-ring" aria-hidden="true"></i>. Console
                </button>
              </h2>

              <div
                id="flush-collapseFive"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">1.Portfolio</div>
              </div>
              <div
                id="flush-collapseFive"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">2.Corporate actions</div>
              </div>
              <div
                id="flush-collapseFive"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">3.Funds statement</div>
              </div>
              <div
                id="flush-collapseFive"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">4.Reports</div>
              </div>
              <div
                id="flush-collapseFive"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">5.Profile</div>
              </div>
              <div
                id="flush-collapseFive"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">6.Segments</div>
              </div>
            </div>

            <div class="accordion-item border rounded mt-2">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseSix"
                  aria-expanded="false"
                  aria-controls="flush-collapseSix"
                >
                  <i class="fa fa-inr" aria-hidden="true"></i>. Coin
                </button>
              </h2>

              <div
                id="flush-collapseSix"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">Mutual funds</div>
              </div>
              <div
                id="flush-collapseSix"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">1.National Pension Scheme (NPS)</div>
              </div>
              <div
                id="flush-collapseSix"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">2.Fixed Deposit (FD)</div>
              </div>
              <div
                id="flush-collapseSix"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">3.Features on Coin</div>
              </div>
              <div
                id="flush-collapseSix"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">4.Payments and Orders</div>
              </div>
              <div
                id="flush-collapseSix"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">5.General</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4 mt-1">
          <div
            className="border-dark rounded p-2 "
            style={{ backgroundColor: "#fdba74" }}
          >
            <ul>
              <li className="mt-2">
                Surveillance measure on scrips - August 2026
              </li>
              <li className="mt-2">
                Latest Intraday leverages and Square-off timings
              </li>
            </ul>
          </div>

          <div className="">
            <table class="table table-light border mt-4">
              <tbody>
                <tr>
                  <td className="table-dark"> Quick links</td>
                </tr>
                <tr>
                  <td>1. Track account opening</td>
                </tr>
                <tr>
                  <td>2. Track segment activation</td>
                </tr>
                <tr>
                  <td>3. Intraday margins</td>
                </tr>
                <tr>
                  <td>4. Kite user manual</td>
                </tr>
                <tr>
                  <td>5. Learn how to create a ticket</td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
