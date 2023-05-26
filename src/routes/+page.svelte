<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import Empty from '$lib/components/empty.svelte';
  import Package from '$lib/components/package.svelte';

  interface NpmData {
    package: string;
    downloads: number;
  }

  let results: Promise<NpmData[]> = Promise.resolve([]);
  let names: string[] = [];

  async function fetchOne(name: string) {
    const res = await fetch(
      `https://api.npmjs.org/downloads/point/last-week/${name}`
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data;
  }

  async function fetchMany(pkgs: string[]) {
    const items = await Promise.all(pkgs.map((x) => fetchOne(x)));
    return items.sort((a, b) => b.downloads - a.downloads);
  }

  $: names = (browser ? $page.url.searchParams.get('q')?.split(',') : []) ?? [];
  $: results = fetchMany(names);
</script>

<main class="min-h-screen container mx-auto flex flex-col">
  <section class="flex-1 p-12">
    {#await results}
      <p>Loading ...</p>
    {:then items}
      {#if items.length > 0}
        <div class="divide-y">
          {#each items as item}
            <Package name={item.package} downloads={item.downloads} />
          {/each}
        </div>
      {:else}
        <Empty />
      {/if}
    {:catch error}
      <p class="text-red-500">Error: {error.message}</p>
    {/await}
  </section>

  <footer class="p-12">
    <a
      href="https://github.com/justinlettau/npm-dashboard"
      class="text-gray-500 hover:underline"
    >
      View on GitHub
    </a>
  </footer>
</main>
