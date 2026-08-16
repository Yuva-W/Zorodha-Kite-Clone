import React from "react";

function RightSection({ productName, productDecription, learnMore, imgURL }) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 mt-5 p-5">
          <h2 className="mt-5">{productName}</h2>
          <p className="mt-5">{productDecription}</p>
          <a href="learnMore">
            {learnMore}
            <i class="fa fa-angle-double-right " aria-hidden="true"></i>
          </a>
        </div>
        <div className="col-6">
            <img src={imgURL} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
