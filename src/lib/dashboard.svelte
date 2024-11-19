<script lang="ts">
  import type { LandpadResponse } from "../interface/LandpadResponse";
  import Map from "./components/map.svelte";
  import Chart from "./components/chart.svelte";
  import Table from "./components/table.svelte";

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
    {#if data.length > 0}
      <Map landingData={data} />
      <Chart landingData={data} />
    {:else}
    <div class="flex justify-between items-start w-full">
      <div class="flex-col items-center">
        <div class="flex items-center mb-1">
          <h1
            class=" m-4 font-inter text-[24px] font-semibold text-center leading-6  text-black"
          >
          No data available
          </h1>
        </div>
      </div>
    </div>
    {/if}
  </div>
</div>
