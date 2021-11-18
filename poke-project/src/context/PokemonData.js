import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const PokemonDataContext = createContext();

export const PokemonDataController = (props) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL = "https://pokemoncontrollerbackend.herokuapp.com/pokemons";

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  const fetchAllPokemons = async () => {
    setLoading(true);
    await axios
      .get(URL)
      .then((response) => setPokemons(response.data))
      .then(() => setLoading(false));
  };

  return (
    <PokemonDataContext.Provider value={[pokemons, setPokemons]}>
      {loading ? "" : props.children}
    </PokemonDataContext.Provider>
  );
};
