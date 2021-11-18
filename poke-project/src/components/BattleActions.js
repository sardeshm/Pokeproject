import React from "react";

const BattleActions = ({ fightRound }) => {
  return (
    <div className="battleactions-container">
      <button value="attack" onClick={(value) => fightRound(value)}>
        Attack
      </button>
      <button value="specialAttack" onClick={(value) => fightRound(value)}>
        Special Attack
      </button>
    </div>
  );
};

export default BattleActions;
