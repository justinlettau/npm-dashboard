<script lang="ts">
  export let name: string;
  export let downloads: number;

  const intl = new Intl.NumberFormat();
</script>

<a
  href="https://www.npmjs.com/package/{name}"
  target="_blank"
  class="flex px-4 py-2 transition-colors hover:bg-gray-100"
>
  <h2 class="flex-1">{name}</h2>
  <p class="text-lg font-semibold text-blue-600">
    {intl.format(downloads)}
  </p>
</a>
