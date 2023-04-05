import React, { Component, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const PokemonView = () => {
  let params = useParams();

  const [selectedPokemon, setSelectedPokemon] = useState({
    name: "",
    types: [],
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    height: 0,
    weight: 0,
  });

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  async function fetchData() {
    const url = `https://pokeapi.co/api/v2/pokemon/${params.pokemon}`;
    const response = await axios.get(url);
    let pokemonData = response.data;
    let types = pokemonData.types;
    let stats = pokemonData.stats;
    let name = capitalizeFirstLetter(pokemonData.forms[0].name);
    let newTypes = types.map((data) => {
      return data.type.name;
    });
    let pokemonObject = {
      name: name,
      types: newTypes,
      image: pokemonData.sprites.other.dream_world.front_default,
      hp: stats[0].base_stat,
      attack: stats[1].base_stat,
      defense: stats[2].base_stat,
      height: pokemonData.height,
      weight: pokemonData.weight,
    };
    setSelectedPokemon(pokemonObject);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="outerDiv">
      <Link className="goBack" to={'/'}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0001 20L4.66675 12L14.0001 4L15.6626 5.4L9.12925 11H23.3334V13H9.12925L15.6626 18.6L14.0001 20Z"
            fill="black"
          />
        </svg>
        <p className="goBackText">Go back to Home Page</p>
      </Link>
      <div className="selectedSection">
        <div className="upperBio">
          <h3 id="pokemonName">{selectedPokemon.name}</h3>
          <div className="typeOuterContainer">
            {selectedPokemon.types.map((type) => {
              return (
                <div className="typeContainer" value={type}>
                  <p className="type" value={type}>
                    {capitalizeFirstLetter(type)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mainBio">
          <div className="bioImage">
            <img
              id="image"
              src={selectedPokemon.image}
              width={225}
              height={225}
            ></img>
          </div>
          <h3 className="baseStats">Base Stats</h3>
          <div className="innerMainBio">
            <div className="leftStats">
              <div className="hp">
                <p className="header">HP</p>
                <div
                  className="bar"
                  style={{
                    width: selectedPokemon.hp * 3,
                    background: "green",
                  }}
                ></div>
              </div>
              <div className="attack">
                <p className="header">Attack</p>
                <div
                  className="bar"
                  style={{
                    width: selectedPokemon.attack * 3,
                    background: "red",
                  }}
                ></div>
              </div>
              <div className="defense">
                <p className="header">Defense</p>
                <div
                  className="bar"
                  style={{
                    width: selectedPokemon.defense * 3,
                    background: "#FDD85D",
                  }}
                ></div>
              </div>
            </div>
            <div className="bioBio">
              <div className="heightSection">
                <p className="header">Height</p>
                <p id="height">{selectedPokemon.height / 10} m</p>
              </div>
              <div className="weightSection">
                <p className="header">Weight</p>
                <p id="weight">{selectedPokemon.weight / 10} kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonView;
