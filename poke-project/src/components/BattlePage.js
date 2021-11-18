import React, { useState, useEffect, useContext } from "react";
import { PokemonDataContext } from "../context/PokemonData";
import DropDownSelector from "./DropDownSelector";
import PokemonStatsDisplay from "./PokemonStatsDisplay";
import BattleActions from "./BattleActions";
import HealthBar from "./HealthBar";

const BattlePage = () => {
  const [pokemonsDefault, setPokemonsDefault] = useContext(PokemonDataContext);

  const [heroPokemon, setHeroPokemon] = useState([]);
  const [opponentPokemon, setOpponentPokemon] = useState([]);
  const [heroHealth, setHeroHealth] = useState();
  const [opponentHealth, setOpponentHealth] = useState();
  const [heroShield, setHeroShield] = useState();
  const [heroSpecialShield, setHeroSpecialShield] = useState();
  const [oppShield, setOppShield] = useState();
  const [oppSpecialShield, setOppSpecialShield] = useState();
  const [history, setHistory] = useState([]);
  const [heroRound, setHeroRound] = useState(1);
  const [oppRound, setOppRound] = useState(1);
  const [winner, setWinner] = useState("");

  const selectHero = (value) => setHeroPokemon(value);
  const selectOpponent = (value) => setOpponentPokemon(value);
  const currentHeroPokemon = pokemonsDefault.filter(
    (p) => p.name.english === heroPokemon
  );
  const currentOpponentPokemon = pokemonsDefault.filter(
    (p) => p.name.english === opponentPokemon
  );
  const pickRandomOpponent = () =>
    setOpponentPokemon(
      pokemonsDefault[Math.floor(Math.random() * pokemonsDefault.length)].name
        .english
    );
  const pickRandomHero = () =>
    setHeroPokemon(
      pokemonsDefault[Math.floor(Math.random() * pokemonsDefault.length)].name
        .english
    );

  useEffect(() => {
    if (currentHeroPokemon.length) {
      assignHeroStats();
      console.log(currentHeroPokemon, currentOpponentPokemon);
    }
    if (currentOpponentPokemon.length) {
      assignOpponentStats();
    }
  }, [heroPokemon, opponentPokemon]);

  const resetFight = () => {
    setHeroPokemon([]);
    setOpponentPokemon([]);
    setHistory([]);
    setHeroRound(1);
    setOppRound(1);
    setWinner(null);
  };

  const assignHeroStats = () => {
    setHistory([]);
    setHeroRound(1);
    setOppRound(1);
    setHeroHealth(currentHeroPokemon[0].base.HP);
    setHeroShield(currentHeroPokemon[0].base.Defense);
    setHeroSpecialShield(currentHeroPokemon[0].base["Sp. Defense"]);
    setWinner(null);
  };

  const assignOpponentStats = () => {
    setHistory([]);
    setHeroRound(1);
    setOppRound(1);
    setOpponentHealth(currentOpponentPokemon[0].base.HP);
    setOppShield(currentOpponentPokemon[0].base.Defense);
    setOppSpecialShield(currentOpponentPokemon[0].base["Sp. Defense"]);
    setWinner(null);
  };

  const fightRound = () => {
    if (
      currentHeroPokemon[0].base.Speed > currentOpponentPokemon[0].base.Speed
    ) {
      attack();
    } else {
      oppAttack();
    }
  };

  useEffect(() => {
    if (opponentHealth > 0 && heroHealth > 0) {
      oppAttack();
    }
  }, [heroRound]);

  useEffect(() => {
    if (opponentHealth > 0 && heroHealth > 0) {
      attack();
    }
  }, [oppRound]);

  const oppAttack = () => {
    const damage = currentOpponentPokemon[0].base.Attack - heroShield;
    setOppRound(oppRound + 1);
    if (damage > 0 && damage < heroHealth) {
      setHeroHealth(heroHealth - damage);
      setHeroShield(0);
      setHistory([
        ...history,
        `Round${oppRound}: Opponent used Attack and dealt ${damage} damage.`,
      ]);
    } else if (damage > 0 && damage >= heroHealth) {
      setHeroHealth(0);
      setHistory([
        ...history,
        `Round${oppRound}:Opponent used Attack and dealt the final blow for ${damage} points.  Hero died!`,
      ]);
      setWinner("Opponent Won");
    } else {
      setHeroShield(heroShield - currentOpponentPokemon[0].base.Attack);
      setHistory([
        ...history,
        `Round${oppRound}:Opponent used Attack and damaged Hero's Shield by ${currentOpponentPokemon[0].base.Attack} points.`,
      ]);
    }
  };

  const attack = () => {
    const damage = currentHeroPokemon[0].base.Attack - oppShield;
    setHeroRound(heroRound + 1);
    if (damage > 0 && damage < opponentHealth) {
      setOpponentHealth(opponentHealth - damage);
      setOppShield(0);
      setHistory([
        ...history,
        `Round${heroRound}: Hero used Attack and dealt ${damage} damage.`,
      ]);
    } else if (damage > 0 && damage >= opponentHealth) {
      setOpponentHealth(0);
      setHistory([
        ...history,
        `Round${heroRound}:Hero used Attack and dealt the final blow for ${damage} points.  Opponent died!`,
      ]);
      setWinner("Hero Won");
    } else {
      setOppShield(oppShield - currentHeroPokemon[0].base.Attack);
      setHistory([
        ...history,
        `Round${heroRound}:Hero used Attack and damaged Opponents Shield by ${currentHeroPokemon[0].base.Attack} points.`,
      ]);
    }
  };

  const specialAttack = (e) => {
    const damage2 = currentHeroPokemon[0].base["Sp. Attack"] - oppSpecialShield;
    setHeroRound(heroRound + 1);
    console.log(
      "Damage:",
      damage2,
      "opp Health:",
      opponentHealth,
      "oppSpecialShield:",
      oppShield
    );
    if (damage2 > 0 && damage2 < opponentHealth) {
      setOpponentHealth(opponentHealth - damage2);
      setOppSpecialShield(0);
      setHistory([
        ...history,
        `Round${heroRound}: Hero used Special Attack and dealt ${damage2} damage.`,
      ]);
    } else if (damage2 > 0 && damage2 >= opponentHealth) {
      setOpponentHealth(0);
      setHistory([
        ...history,
        `Round${heroRound}:Hero used Special Attack and dealt the final blow for ${damage2} points.  Opponent died!`,
      ]);
      setWinner("Hero Won");
    } else {
      setOppSpecialShield(
        oppSpecialShield - currentHeroPokemon[0].base["Sp. Attack"]
      );
      setHistory([
        ...history,
        `Round${heroRound}:Hero used Special Attack and damaged Opponents Shield by ${currentHeroPokemon[0].base["Sp. Attack"]} points.`,
      ]);
    }
  };

  return (
    <div className="background-battle">
      <div className="battlepage-container">
        <div className="battlepage-small-container">
          <div className="Pokemonselector Hero">
            <div className="pokemon-row">
              <DropDownSelector
                onChange={(value) => {
                  selectHero(value);
                }}
              />
            </div>
            <div className="pokemon-row">
              <button onClick={pickRandomHero}>Random</button>
            </div>
            <div className="pokemon-row">
              <h2>{heroPokemon}</h2>
            </div>
            <div className="pokemon-row">
              {heroPokemon.length > 0 ? (
                <>
                  <div className="battlepage-imagecontainer">
                    <img
                      src={`https://img.pokemondb.net/artwork/${currentHeroPokemon[0].name.english.toLowerCase()}.jpg`}
                    />
                  </div>
                  <div className="pokemon-row">
                    <PokemonStatsDisplay currentPokemon={currentHeroPokemon} />
                  </div>
                  <div className="pokemon-row">
                    <HealthBar
                      Health={heroHealth}
                      initialHealth={currentHeroPokemon[0].base.HP}
                    />
                  </div>
                </>
              ) : (
                <div>No pokemon selected</div>
              )}
            </div>
          </div>

          <div className="Pokemonselector opponent">
            <div className="pokemon-row">
              <DropDownSelector
                onChange={(value) => {
                  selectOpponent(value);
                }}
              />
            </div>
            <div className="pokemon-row">
              <button onClick={pickRandomOpponent}>Random</button>
            </div>
            <div className="pokemon-row">
              <h2>{opponentPokemon}</h2>
            </div>
            <div className="pokemon-row">
              {opponentPokemon.length > 0 ? (
                <>
                  <div className="battlepage-imagecontainer">
                    <img
                      src={`https://img.pokemondb.net/artwork/${currentOpponentPokemon[0].name.english.toLowerCase()}.jpg`}
                    />
                  </div>
                  <div className="pokemon-row">
                    <PokemonStatsDisplay
                      currentPokemon={currentOpponentPokemon}
                    />
                  </div>
                  <div className="pokemon-row">
                    <HealthBar
                      Health={opponentHealth}
                      initialHealth={currentOpponentPokemon[0].base.HP}
                    />
                  </div>
                </>
              ) : (
                <div>No Opponent Selected</div>
              )}
            </div>
          </div>
        </div>
        {!winner ? (
          <div className="pokemon-row">
            <BattleActions fightRound={fightRound} />
          </div>
        ) : (
          <div className="resetfight">
            <h1 style={{ textAlign: "center" }}>{winner}</h1>
            <button onClick={resetFight}>Reset Fight</button>
          </div>
        )}
        <div className="pokemon-row">
          {history.map((h) => {
            return <div>{h}</div>;
          })}
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default BattlePage;
