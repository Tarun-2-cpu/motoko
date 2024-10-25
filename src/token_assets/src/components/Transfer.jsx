import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";

function Transfer() {

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isHidden, setHidden] = useState(true);
  const [isDisabled, setDisabled] = useState(false);

  async function handleClick() {
    setDisabled(true);
    try {
      const res = Principal.fromText(recipient);
      const transferAmount = Number(amount);

      if (isNaN(transferAmount) || transferAmount <= 0) {
        throw new Error("Invalid transfer amount");
      }

      const result = await token.transfer(res, transferAmount);
      setFeedback(result);
    } catch (error) {
      setFeedback("Error: " + error.message);
    } finally {
      setHidden(false);
      setDisabled(false);
    }
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient Principal ID"
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter transfer amount"
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
          <p hidden={isHidden}>{feedback}</p>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
