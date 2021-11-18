import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PokemonDataController } from "./context/PokemonData";
import Allpokemons from "./components/Allpokemons";
import SingleBigPokemon from "./components/SingleBigPokemon";
import MyNavbar from "./components/MyNavbar";
import BattlePage from "./components/BattlePage";

const App = () => {
  return (
    <Router>
      <div>
        <div className="background-pokemon">
          <MyNavbar />
          <PokemonDataController>
            <Switch>
              <Route path="/" exact component={Allpokemons} />
              <Route path="/battle" component={BattlePage} />
              <Route path="/pokemons/:id" component={SingleBigPokemon} />
            </Switch>
          </PokemonDataController>
        </div>
      </div>
    </Router>
  );
};
export default App;
