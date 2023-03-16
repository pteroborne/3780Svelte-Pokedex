import { writable } from "svelte/store";

export const pokemons = writable([]);
export const favoritePokemons = writable([]);

export const typeFilterOptions = writable([]);
