import React from "react";

function Hero() {
  return (
    <div className=" bg-light border-top border-bottom mb-5">
      <div className="container">
        <div className="row mt-5">
          <div className="col-3 ps-5 ">
            <h1>Support Portal</h1>
          </div>
          <div className="col-7"></div>
          <div className="col-2 ps-5">
            <button className="btn btn-primary fs-4 mt-2">My Ticket</button>
          </div>
          <div className="col-12 ps-5 mt-5 mb-5 ">
            <input
              class="form-control me-2 p-3"
              style={{ width: "97.5%", boxShadow: '0 0 3px 0px #020202' }}
              type="search"
              placeholder=" Eg: How do I open my account, How do i activate F&O..."
              aria-label="Search"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
