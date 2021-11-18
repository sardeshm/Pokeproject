import React from "react";

const HealthBar = ({ Health, initialHealth }) => {
  return (
    <div className="healthbar-container">
      <label for="healthbar">Healthbar</label>
      <meter
        id="healthbar"
        min="0"
        low="25"
        high="50"
        optimum="100"
        max="100"
        value={(Health / initialHealth) * 100}
      ></meter>
    </div>
  );
};

export default HealthBar;
