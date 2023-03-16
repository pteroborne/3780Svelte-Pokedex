import axios from "axios";

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemons(limit = 20, offset = 0, typeFilter = '') {
  let url = `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
  if (typeFilter) {
    url = `${POKEAPI_BASE_URL}/type/${typeFilter}`;
  }

  const { data } = await axios.get(url);
  const pokemonList = typeFilter ? data.pokemon.map(({ pokemon }) => pokemon) : data.results;
  return await Promise.all(pokemonList.map(async (pokemon) => {
    const { data } = await axios.get(pokemon.url);
    return data;
  }));
}



export async function fetchPokemon(name) {
  const { data } = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${name}`);
  return data;
}

export async function fetchTypes() {
  const { data } = await axios.get(`${POKEAPI_BASE_URL}/type`);
  return data.results;
}
