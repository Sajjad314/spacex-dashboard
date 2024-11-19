<script lang="ts">
  import { ButtonGroup, Button } from "flowbite-svelte";
  import { ListOutline } from "flowbite-svelte-icons";
  import Dropdown from "./dropdown.svelte";
  import Datatable from "../components/datatable.svelte";
  import { onMount } from "svelte";
  import Gridview from "../components/gridview.svelte";
  import type { LandpadResponse } from "../../interface/LandpadResponse";
  let error = "";
  let viewMode = $state("list");

  let {landingData,selectedVal, onSetSelectedValue} : {landingData: LandpadResponse[];selectedVal:string;onSetSelectedValue:Function} = $props();


  function setView(mode: string) {
    viewMode = mode;
  }
</script>

<div class="flex flex-col gap-6">
  <div class="flex justify-between">
    <div class="flex border border-gray-200 rounded-md">
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button
        class="p-2 cursor-pointer"
        class:bg-gray-300={viewMode === "list"}
        onclick={() => setView("list")}
      >
        <svg
          class="w-6 h-6 text-black dark:text-white"
          class:text-blue-600={viewMode === "list"}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"
          />
        </svg>
      </button>

      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button
        class="p-2 cursor-pointer"
        class:bg-gray-300={viewMode === "grid"}
        onclick={() => setView("grid")}
      >
        <svg
          class="w-6 h-6 text-black dark:text-white"
          class:text-blue-600={viewMode !== "list"}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857Zm10 0A1.857 1.857 0 0 0 13 14.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 19.143v-4.286A1.857 1.857 0 0 0 19.143 13h-4.286Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div>
      <Dropdown selectedVal={selectedVal} onSetSelectedValue={onSetSelectedValue}/>
    </div>
  </div>

  {#if error}
    <p>Error: {error}</p>
  {:else}
    {#if viewMode === "list"}
      <Datatable landingZones={landingData} />
    {:else}
      <Gridview landingZones={landingData}/>
    {/if}
  {/if}
</div>
