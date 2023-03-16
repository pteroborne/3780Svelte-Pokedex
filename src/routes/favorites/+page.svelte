<script>
  import { favoritePokemons } from '$lib/stores';
</script>

<main>
  <h1 class="title">Favorite Pokemon</h1>
  <div class="columns is-multiline">
    {#each $favoritePokemons as pokemon (pokemon.name)}
      <div class="column is-one-third">
        <a href={`/${pokemon.name}`}>
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{pokemon.name}</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    {/each}
  </div>
</main>
