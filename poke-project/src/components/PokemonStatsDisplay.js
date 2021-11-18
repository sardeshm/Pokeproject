import React from "react";

const PokemonStatsDisplay = ({ currentPokemon }) => {
  return (
    <div>
      <div className="bigpokemoncard-base">
        <div className="bigpokemoncard-metercontainer">
          <label for="HP">HP: {currentPokemon[0].base.HP}</label>
          <meter
            id="HP"
            min="0"
            max="100"
            value={currentPokemon[0].base.HP}
          ></meter>
          <label for="attack">Attack: {currentPokemon[0].base.Attack}</label>
          <meter
            id="attack"
            min="0"
            max="100"
            value={currentPokemon[0].base.Attack}
          ></meter>
          <label for="Defense">Defense: {currentPokemon[0].base.Defense}</label>
          <meter
            id="Defense"
            min="0"
            max="100"
            value={currentPokemon[0].base.Defense}
          ></meter>
        </div>
        <div className="bigpokemoncard-metercontainer">
          <label for="Special Attack">
            Special Attack: {currentPokemon[0].base["Sp. Attack"]}
          </label>
          <meter
            id="Special Attack"
            min="0"
            max="100"
            value={currentPokemon[0].base["Sp. Attack"]}
          ></meter>
          <label for="Special Defense">
            Special Defense: {currentPokemon[0].base["Sp. Defense"]}
          </label>
          <meter
            id="Special Defense"
            min="0"
            max="100"
            value={currentPokemon[0].base["Sp. Defense"]}
          ></meter>
          <label for="Speed">Speed: {currentPokemon[0].base.Speed}</label>
          <meter
            id="Speed"
            min="0"
            max="100"
            value={currentPokemon[0].base.Speed}
          ></meter>
        </div>
      </div>
    </div>
  );
};

export default PokemonStatsDisplay;
