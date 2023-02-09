import React, { useEffect, useState } from "react";
import { ERC20Helper } from "../helpers/ERC20Helper";
import { BUIDL_TOKEN_ADDRESS } from "../constants";

export default function ERC20Balance({erc20TokenAddress = BUIDL_TOKEN_ADDRESS, rpcURL, size, address}) {
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState(null);

  useEffect(() => {
    async function getBalance() {
      if (!address) {
        return;
      }

      try {
          const buxxHelper = new ERC20Helper(erc20TokenAddress, null, rpcURL);
          console.log("buxxHelper", buxxHelper);      

          let symbol = await (buxxHelper.symbol());
          console.log("symbol", symbol);
          setSymbol(symbol);

          console.log("address", address);
          let balance = await (buxxHelper.balanceOf(address));
          console.log("balance", balance);

          let inverseDecimalCorrectedAmountNumber = await buxxHelper.getInverseDecimalCorrectedAmountNumber(balance);
          console.log("inverseDecimalCorrectedAmountNumber", inverseDecimalCorrectedAmountNumber);

          setBalance(inverseDecimalCorrectedAmountNumber);
      }
      catch (error) {
        console.error("Coudn't fetch balance", error)
      }

    }

    getBalance();
  }, [address])

  return (
    <span
      style={{
        verticalAlign: "middle",
        fontSize: size ? size : 24,
        padding: 8,
      }}

    >
      {balance && balance.toFixed(2)}
    </span>
  );
}