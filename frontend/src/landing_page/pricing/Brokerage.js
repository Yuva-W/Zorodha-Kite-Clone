import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div>
        <h2>Currency</h2>
        <table class="table table-light table-striped border mt-5 ">
          <tbody>
            <tr>
              <td> </td>
              <td>Currency futures</td>
              <td>Currency options</td>
            </tr>
            <tr>
              <td>Brokerage</td>
              <td>0.03% or ₹ 20/executed order whichever is lower</td>
              <td>₹ 20/executed order</td>
            </tr>
            <tr>
              <td>STT/CTT</td>
              <td> No STT</td>
              <td> No STT</td>
            </tr>
            <tr>
              <td>Transaction charges</td>
              <td>
                NSE: 0.00035% <br />
                BSE: 0.00045%
              </td>
              <td>
                NSE: 0.0311%
                <br />
                BSE: 0.001%
              </td>
            </tr>
            <tr>
              <td>GST</td>
              <td>18% on (brokerage + SEBI charges + transaction charges)</td>
              <td>18% on (brokerage + SEBI charges + transaction charges)</td>
            </tr>
            <tr>
              <td>SEBI charges</td>
              <td>₹10 / crore</td>
              <td>₹10 / crore</td>
            </tr>
            <tr>
              <td>Stamp charges</td>
              <td>0.0001% or ₹10 / crore on buy side</td>
              <td>0.0001% or ₹10 / crore on buy side</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{marginTop: '13rem'}}>Charges for account opening</h3>
        <table class="table table-light table-striped border mt-4 " >
          <tbody>
            <tr>
              <td>Type of account</td>
              <td>Charges</td>
            </tr>
            <tr>
              <td>Individual account</td>
              <td><button className="btn btn-success disabled ">FREE</button></td>
            </tr>
            <tr>
              <td>Minor account</td>
              <td><button className="btn btn-success disabled ">FREE</button></td>
            </tr>
            <tr>
              <td>NRI account</td>
              <td>₹ 500</td>
            </tr>
            <tr>
              <td>HUF account</td>
              <td><button className="btn btn-success disabled ">FREE</button>(online) / ₹ 500 (offline)</td>
            </tr>
            <tr>
              <td>Partnership, LLP, and Corporate accounts (offline only)</td>
              <td>₹ 500</td>
            </tr>
            
          </tbody>
        </table>
      </div>

      <div>
        <h3 style={{marginTop: '6rem'}}>Disclaimer</h3>

        <p className="text-small text-muted mt-5">For Delivery based trades, a minimum of ₹0.01 will be charged per contract note. Clients who opt to receive physical contract notes will be charged ₹20 per contract note plus courier charges. Brokerage will not exceed the rates specified by SEBI and the exchanges. All statutory and regulatory charges will be levied at actuals. Brokerage is also charged on expired, exercised, and assigned options contracts. Free investments are available only for our retail individual clients. Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20 (whichever is less) as delivery brokerage. A brokerage of 0.25% of the contract value will be charged for contracts where physical delivery happens. For netted off positions in physically settled contracts, a brokerage of 0.1% will be charged.</p>
      </div>
    </div>
  );
}

export default Brokerage;
