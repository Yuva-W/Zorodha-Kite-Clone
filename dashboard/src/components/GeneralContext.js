import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("BUY");

  const handleOpenBuyWindow = (uid) => {
    setSelectedStockUID(uid);
    setOrderMode("BUY");
    setIsBuyWindowOpen(true);
  };

  const handleOpenSellWindow = (uid) => {
    setSelectedStockUID(uid);
    setOrderMode("SELL");
    setIsBuyWindowOpen(true);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setOrderMode("BUY");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeBuyWindow: handleCloseBuyWindow,
      }}
    >
      {props.children}

      {isBuyWindowOpen && (
        <>
          <div
            className="order-modal-backdrop"
            onClick={handleCloseBuyWindow}
          ></div>

          <BuyActionWindow uid={selectedStockUID} mode={orderMode} />
        </>
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
