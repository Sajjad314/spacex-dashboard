<script lang="ts">
  import Title from "$lib/title.svelte";
  import Table from "$lib/table.svelte";
  import "./index.css";
  import type { LandpadResponse } from '../interface/LandpadResponse';

  export let data: { landingData: LandpadResponse[] }; 
  const landingData = data.landingData;
  console.log(landingData);
</script>

<Title />
<div class="flex gap-x-10 mx-24">
  <div class="w-2/3">
    <Table {landingData} />
  </div>
  <div class="w-1/3 bg-blue-400 p-4 h-96">
    <!-- Other components can be placed here and receive the same data if needed -->
  </div>
</div>
