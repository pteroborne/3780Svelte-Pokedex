export function toggleFavorite(pokemon, favoritePokemons) {
  const index = favoritePokemons.findIndex(({ name }) => name === pokemon.name);

  if (index === -1) {
    favoritePokemons.push(pokemon);
  } else {
    favoritePokemons.splice(index, 1);
  }
}
