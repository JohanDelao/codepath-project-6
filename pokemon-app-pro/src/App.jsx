import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState(pokemon);
  const [searchInput, setSearchInput] = useState("");

  async function fetchData() {
    for (let i = 1; i < 150; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const response = await axios.get(url);
      let pokemonData = response.data;
      let types = pokemonData.types;
      let stats = pokemonData.stats;
      let name = pokemonData.name;
      let newTypes = types.map((data) => {
        return data.type.name;
      });
      let key = generateUniqueKey();
      let pokemonObject = {
        name: name,
        types: newTypes,
        image: pokemonData.sprites.other.dream_world.front_default,
        hp: stats[0].base_stat,
        attack: stats[1].base_stat,
        defense: stats[2].base_stat,
        height: pokemonData.height,
        weight: pokemonData.weight,
        id: key,
      };
      setPokemon((pokemons) => [...pokemons, pokemonObject]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function consolePokemon(key) {
    let select = findObjectByKey(pokemon, "id", key);
    console.log(select.hp);
    console.log(select.attack);
    console.log(select.defense);
    setSelectedPokemon(select);
  }

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function findObjectByKey(array, key, value) {
    return array.find((obj) => obj[key] === value);
  }

  function generateUniqueKey() {
    const keyLength = 10;
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";

    for (let i = 0; i < keyLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      key += characters[randomIndex];
    }

    return key;
  }

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = pokemon.filter((item) =>
        item.name.toLowerCase().startsWith(searchValue)
      );
      setFilter(filteredData);
    } else {
      setFilter(pokemon);
    }
    console.log(filter);
  };

  return (
    <div className="App">
      <div className="lowerSection">
        <input
          id="searchBar"
          placeholder="Search"
          onChange={(inputString) =>
            searchItems(inputString.target.value.toLowerCase())
          }
        ></input>
        <div className="pokemonContainer">
          {searchInput.length > 0
            ? filter.map((pokemon) => {
                return (
                  <Link
                    to={`/PokemonView/${pokemon.name}`}
                    className="pokemon"
                    key={pokemon.id}
                    onClick={() => consolePokemon(pokemon.id)}
                  >
                    <img src={pokemon.image} width={100} height={100}></img>
                    <h3 className="pokemonName">{capitalizeFirstLetter(pokemon.name)}</h3>
                  </Link>
                );
              })
            : pokemon.map((pokemon) => {
                return (
                  <Link
                    to={`/PokemonView/${pokemon.name}`}
                    className="pokemon"
                    key={pokemon.id}
                    onClick={() => consolePokemon(pokemon.id)}
                  >
                    <img src={pokemon.image} width={100} height={100}></img>
                    <h3 className="pokemonName">{capitalizeFirstLetter(pokemon.name)}</h3>
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default App;