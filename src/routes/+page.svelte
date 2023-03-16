<script>
  import { onMount } from "svelte";
  import { pokemons, favoritePokemons, typeFilterOptions } from "$lib/stores";
  import { fetchPokemons, fetchTypes } from "$lib/pokeapi";
  import "bulma/css/bulma.min.css";
  import PokemonCard from "../components/PokemonCard.svelte";
  import { flip } from "svelte/animate";

  let search = "";
  let typeFilter = "";
  let currentPage = 0;
  const pageSize = 20;


  onMount(async () => {
    await updatePokemons();
    await updateTypes();
  });

  async function updatePokemons() {
    const fetchedPokemons = await fetchPokemons(pageSize, currentPage * pageSize, typeFilter === "All" ? "" : typeFilter);
    const filteredPokemons = fetchedPokemons.filter(({ name }) => name.includes(search));
    pokemons.set(filteredPokemons);
  }


  async function updateTypes() {
    const fetchedTypes = await fetchTypes();
    typeFilterOptions.set([{ name: "All" }, ...fetchedTypes]);
  }

  function nextPage() {
    currentPage += 1;
    updatePokemons();
  }

  function prevPage() {
    if (currentPage > 0) {
      currentPage -= 1;
      updatePokemons();
    }
  }

  function resetPagination() {
    currentPage = 0;
    updatePokemons();
  }


  let filterFavorites = false;

  function toggleFavorite(pokemon) {
    favoritePokemons.update((favorites) => {
      const index = favorites.findIndex(({ name }) => name === pokemon.name);
      if (index === -1) {
        return [...favorites, pokemon];
      } else {
        return favorites.filter((_, i) => i !== index);
      }
    });
  }

  $: filteredPokemons = $pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  $: displayedPokemons = filterFavorites
    ? $favoritePokemons
    : filteredPokemons;

</script>

<main>
  <h1 class="title">Pokedex</h1>
  <div class="field has-addons">
    <div class="control">
      <input type="text" class="input" bind:value={search} placeholder="Search" on:input={() => resetPagination()} />
    </div>
    <div class="control">
      <span class="select">
        <select bind:value={typeFilter} on:change={() => resetPagination()}>
          {#each $typeFilterOptions as type}
            <option value={type.name}>{type.name}</option>
              {/each}
        </select>
      </span>
    </div>
  </div>
  <p>Number of favorites: {$favoritePokemons.length}</p>
  <label class="checkbox">
    <input type="checkbox" bind:checked={filterFavorites} />
    Show favorites
  </label>

  <div class="columns is-multiline">
    {#each displayedPokemons as pokemon (pokemon.name)}
      <div class="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
        <PokemonCard
          {pokemon}
          isFavorite={$favoritePokemons.findIndex(({ name }) => name === pokemon.name) !== -1}
          {toggleFavorite}
        />
      </div>
    {/each}
  </div>

  <nav class="pagination">
    <button class="pagination-previous" on:click={prevPage}>&laquo; Prev</button>
    <button class="pagination-next" on:click={nextPage}>Next &raquo;</button>
  </nav>
</main>


<style>
  main {
      margin: auto;
      max-width: 1024px;
  }
</style>