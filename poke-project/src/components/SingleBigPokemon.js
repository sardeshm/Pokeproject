import React, { useContext } from "react";
import { PokemonDataContext } from "../context/PokemonData";
import PokemonStatsDisplay from "./PokemonStatsDisplay";

const SingleBigPokemon = ({ match }) => {
  const [pokemons, setPokemons] = useContext(PokemonDataContext);
  const id = match.params.id;
  const currentPokemon = pokemons.filter((pokemon) => pokemon.id == id);
  console.log(currentPokemon);

  return !currentPokemon ? (
    <div>isloading...</div>
  ) : (
    <div className="bigpokemoncard">
      <h1>{currentPokemon[0].name.english}</h1>

      <div className="bigpokemoncard-subcontainer">
        <img
          src={`https://img.pokemondb.net/artwork/${currentPokemon[0].name.english.toLowerCase()}.jpg`}
          alt=""
        />
        <PokemonStatsDisplay currentPokemon={currentPokemon} />
      </div>
      <div className="bigpokemoncard-type">
        {currentPokemon[0].type.map((t) => {
          return (
            <div className={`bigpokemoncardtype pokecard-span ${t}`}>{t}</div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleBigPokemon;
