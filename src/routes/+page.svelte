<script lang="ts">
  import Title from "$lib/title.svelte";
  import Table from "$lib/table.svelte";
  import "./index.css";
  import type { LandpadResponse } from "../interface/LandpadResponse";
  import Map from "../components/map.svelte";
  import Chart from "../components/chart.svelte";

  export let data: { landingData: LandpadResponse[] };
  const landingData = data.landingData;
  console.log(landingData);
</script>

<Title />
<div class="flex gap-x-10 mx-24 h-auto">
  <div class="w-2/3">
    <Table {landingData} />
  </div>
  <div class="w-1/3 flex flex-col gap-6">
    <Map {landingData} />
    <Chart {landingData}/>
  </div>
</div>
