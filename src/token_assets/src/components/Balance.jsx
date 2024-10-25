import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {

  const[val,setVal] = useState("");
  const[balan,setBalance] = useState("");
  const [sym,setSym] = useState("");
  const[isHidden,setIsHidden] = useState(true); 
  

  async function handleClick() {
    const principal = Principal.fromText(val)
    const balanceResult  = await token.balanceOf(principal);
    const balance = balanceResult ? balanceResult.toLocaleString() : "0";
    const symbol = await token.getSym();
    setBalance(balance);
    setSym(symbol);
    setIsHidden(false);
  }

  console.log(balan,sym);

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={val}
          onChange={(e)=> setVal(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balan} {sym} </p>
    </div>
  );
}

export default Balance;
