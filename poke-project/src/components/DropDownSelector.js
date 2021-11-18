import React, { useContext } from "react";
import { PokemonDataContext } from "../context/PokemonData";

const DropDownSelector = ({ onChange }) => {
  const [pokemonsDefault, setPokemonsDefault] = useContext(PokemonDataContext);

  return (
    <div>
      <select onChange={(e) => onChange(e.target.value)}>
        {pokemonsDefault.map((p) => {
          return (
            <option key={p.id} value={p.name.english}>
              {p.name.english}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDownSelector;
