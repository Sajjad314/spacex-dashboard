<script lang="ts">
  import type { LandpadResponse } from "../interface/LandpadResponse";
  import Map from "./components/map.svelte";
  import Chart from "./components/chart.svelte";
  import Table from "./components/table.svelte";
  import { Card } from "flowbite-svelte";

  let { landingData }: { landingData: LandpadResponse[] } = $props();
  let selectedVal: string = $state("active");
  let data: LandpadResponse[] = $state([]);
  function onSetSelectedValue(option: string) {
    selectedVal = option;
    const filteredData = landingData.filter((item) => item.status === option);
    data = filteredData;
  }
</script>

<div class="flex flex-col lg:flex-row lg:gap-x-10 mx-4 lg:mx-24 h-auto">
  <div class="w-full lg:w-2/3">
    <Table landingData={data} {selectedVal} {onSetSelectedValue} />
  </div>

  <div class="w-full lg:w-1/3 flex flex-col gap-6 mt-6 lg:mt-0">
    <Card class="p-0">
      <h1
        class=" m-4 font-inter text-lg font-semibold leading-6 text-left text-gray-900"
      >
        Map View
      </h1>
      {#if data.length === 0}
        <h1
          class="font-inter text-xl font-semibold text-center leading-6 text-gray-400 py-20"
        >
          No data available
        </h1>
      {:else}
        <Map landingData={data} />
      {/if}
    </Card>
    <Card class="p-0">
      <h1
        class=" m-4 font-inter text-lg font-semibold leading-6 text-left text-gray-900"
      >
        Success Rate Chart
      </h1>
      {#if data.length === 0}
        <h1
          class="font-inter text-xl font-semibold text-center leading-6 text-gray-400 py-20"
        >
          No data available
        </h1>
      {:else}
        <Chart landingData={data} />
      {/if}
    </Card>
  </div>
</div>
