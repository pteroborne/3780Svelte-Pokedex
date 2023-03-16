<script>
  import PokemonDetails from "./PokemonDetails.svelte";
  import { scale } from "svelte/transition";

  export let pokemon;
  export let isFavorite = false;
  export let toggleFavorite;

  let isSelected = false;
</script>

<div class="card-container" style={`z-index: ${isSelected ? 1 : 0};`}>
  <div
    class="card"
    transition:scale="{{ duration: 300 }}"
    on:click={() => (isSelected = !isSelected)}
    style={`transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'}; z-index: ${isSelected ? 1 : 0};`}
  >
    <div class="card-image">
      <figure class="image is-128x128">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{pokemon.name}</p>
          <p class="subtitle is-6">{pokemon.types.map((type) => type.type.name).join(', ')}</p>
        </div>
      </div>
      <button
        class="button is-small"
        on:click|preventDefault={() => toggleFavorite(pokemon)}
      >
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>
    </div>
    {#if isSelected}
      <div class="details">
        <PokemonDetails {pokemon} />
      </div>
    {/if}
  </div>

</div>

<style>
    .card-container {
        position: relative;
        border: solid black 1px;
        box-shadow: 4px 4px;
    }
    .details {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(255, 255, 255);
        padding: 1rem;
        overflow: auto;
        box-sizing: border-box;
        transform: translateY(100%);
    }
</style>

