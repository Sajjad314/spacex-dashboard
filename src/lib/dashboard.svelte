<script lang="ts">
  import type { LandpadResponse } from "../interface/LandpadResponse";
  import Map from "../components/map.svelte";
  import Chart from "../components/chart.svelte";
  import Table from "$lib/table.svelte";

  let {landingData}: {landingData:LandpadResponse[]} = $props()
  let selectedVal :string =$state("sss") ;
  const setSelectedVal = () =>{
    selectedVal = "llll"
  }
  console.log(selectedVal);
  
  
</script>

<div class="flex gap-x-10 mx-24 h-auto">
    <div class="w-2/3">
      <Table {landingData} setSelectedVal={setSelectedVal} />
      <h1>{selectedVal}</h1>
    </div>
    <div class="w-1/3 flex flex-col gap-6">
      <Map {landingData} />
      <Chart {landingData}/>
    </div>
  </div>