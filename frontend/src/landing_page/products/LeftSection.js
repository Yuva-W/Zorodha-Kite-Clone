import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container">
      <div className="row">
        
        <div className="col-6 p-5">
          <img src={imageURL} />
        </div>
        <div className="col-6 p-5">
          <h1 className="mt-5">{productName}</h1>
          <p className="mt-5">{productDescription}</p>
          <div className="mt-4">
            <a href="tryDemo">
              tryDemo{" "}
              <i class="fa fa-angle-double-right " aria-hidden="true"></i>
            </a>
            <a href="learnMore" style={{ marginLeft: "3rem" }}>
              Learn More{" "}
              <i class="fa fa-angle-double-right " aria-hidden="true"></i>
            </a>
          </div>
          <div className="mt-4">
            <a href="googlePlay">
              <img src="media\images\googlePlayBadge.svg" />
            </a>
            <a href="appStore" style={{ marginLeft: "2rem" }}>
              <img src="\media\images\appstoreBadge.svg" />
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default LeftSection;
