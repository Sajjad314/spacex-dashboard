<script lang="ts">
  import type { LandpadResponse } from "../interface/LandpadResponse";
  import Map from "../components/map.svelte";
  import Chart from "../components/chart.svelte";
  import Table from "$lib/table.svelte";

  let {landingData}: {landingData:LandpadResponse[]} = $props()
  let selectedVal :string =$state("active") ;
  let data:LandpadResponse[] = $state([])
  function onSetSelectedValue (option:string){
    selectedVal = option;
    const filteredData = landingData.filter(item => item.status === option);
    data = filteredData
  }
</script>

<div class="flex gap-x-10 mx-24 h-auto">
    <div class="w-2/3">
      <Table landingData={data} selectedVal={selectedVal} onSetSelectedValue={onSetSelectedValue} />
    </div>
    <div class="w-1/3 flex flex-col gap-6">
      {#if data.length>0}

        <Map landingData={data} />
        <Chart landingData = {data}/>
      {/if}
    </div>
  </div>