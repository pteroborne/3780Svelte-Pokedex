<script>
  export let pokemon;
</script>

<div class="content">
  <h2>Details</h2>
  <p>Height: {pokemon.height}</p>
  <p>Weight: {pokemon.weight}</p>
  <h3>Abilities:</h3>
  <ul>
    {#each pokemon.abilities as ability}
      <li>{ability.ability.name}</li>
    {/each}
  </ul>
  <h3>Stats:</h3>
  <ul>
    {#each pokemon.stats as stat}
      <li>{stat.stat.name}: {stat.base_stat}</li>
    {/each}
  </ul>
</div>
