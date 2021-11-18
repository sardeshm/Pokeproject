import React, { useState, useContext } from "react";
import { PokemonDataContext } from "../context/PokemonData";
import SinglefullPokemon from "./SinglefullPokemon";
import ReactPaginate from "react-paginate";
import uniqid from "uniqid";
import SearchBar from "./Searchbar";

const Allpokemons = (props) => {
  const [pokemonsDefault, setPokemonsDefault] = useContext(PokemonDataContext);
  const [pageNumber, setPageNumber] = useState(0);

  //! logic for filtering Pokemon based on Searchbarinput
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchTerm = (value) => {
    setSearchTerm(value);
  };

  //!Pagination Logic
  const currentPage = pageNumber;
  const start = currentPage * 20;
  const end = (currentPage + 1) * 20;

  const currentPokemons = pokemonsDefault.slice(start, end);

  const handlePageClick = (data) => {
    setPageNumber(data.selected);
  };
  const totalPageCount = pokemonsDefault.length / 20;

  //!end of Pagination Logic

  return (
    <div>
      <div className="background-pokedex">
        <SearchBar onChange={(value) => updateSearchTerm(value)} />
        <div className="pokemonlist-poke-container">
          <div className="pokemonlist-poke-row">
            {currentPokemons
              .filter((pokemon) => {
                return pokemon.name.english
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              })
              .map((pokemon) => {
                return (
                  <SinglefullPokemon
                    key={uniqid()}
                    name={pokemon.name}
                    type={pokemon.type}
                    base={pokemon.base}
                    id={pokemon.id}
                  />
                );
              })}
          </div>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={totalPageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
};

export default Allpokemons;
