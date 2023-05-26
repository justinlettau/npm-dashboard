<script lang="ts">
  const baseUrl = import.meta.env.BASE_URL;
  const examples = [
    'axios',
    'react,tailwindcss,@vitejs/plugin-react,prettier',
    '@angular/core,react,vue,svelte',
  ];
</script>

<div>
  <p class="mb-6">
    Add packages to the query string in the URL to get started 👆
  </p>
  <p>For example:</p>
  <ul class="ml-2">
    {#each examples as example}
      <li>
        <a href="{baseUrl}?q={example}" class="hover:underline">
          <code>/?q={example}</code>
        </a>
      </li>
    {/each}
  </ul>
</div>
