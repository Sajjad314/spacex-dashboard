<script lang="ts">
  import Title from "$lib/components/title.svelte";
  import "./index.css";
  import type { LandpadResponse } from "../interface/LandpadResponse";
  import Dashboard from "$lib/dashboard.svelte";

  export let data: { landingData: LandpadResponse[] };
  const landingData = data.landingData;
</script>

<Title />
<Dashboard landingData={landingData}/>
