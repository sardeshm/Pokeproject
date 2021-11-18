import React from "react";
import uniqid from "uniqid";
import { Link } from "react-router-dom";

const SinglefullPokemon = ({ id, name, type, base }) => {
  return (
    <div className="pokecard-small">
      <Link to={`/pokemons/${id}`}>
        <div className="pokecard-small-imagecontainer">
          <img
            className="pokecard-small-image"
            src={`https://img.pokemondb.net/artwork/${name.english.toLowerCase()}.jpg`}
            alt={`pokepic of ${name.english}`}
          />
        </div>
        <p className="pokecardid-small">#{id}</p>
        <h4>{name.english}</h4>
        {type.map((eachtype) => {
          return (
            <span key={uniqid()} className={`pokecard-span ${eachtype}`}>
              {eachtype}
            </span>
          );
        })}
      </Link>
    </div>
  );
};

export default SinglefullPokemon;
