import React from "react";

const RemainingChances = ({ remainingLives }) => (
  <div className="remaining-chances">
    <span className="remaining-chances-text">
      남은 기회 {remainingLives}번!
    </span>
  </div>
);

export default RemainingChances;
