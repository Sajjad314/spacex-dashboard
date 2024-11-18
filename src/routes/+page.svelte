<script lang="ts">
  import Title from "$lib/title.svelte";
  import "./index.css";
  import type { LandpadResponse } from "../interface/LandpadResponse";
  import Dashboard from "$lib/dashboard.svelte";

  export let data: { landingData: LandpadResponse[] };
  const landingData = data.landingData;
  console.log("ll"+landingData);
</script>

<Title />
<Dashboard landingData={landingData}/>
