<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Modal
  } from "flowbite-svelte";
  import { LinkOutline } from "flowbite-svelte-icons";
  import type { LandpadResponse } from "../interface/LandpadResponse";
  import { onMount } from "svelte";
  
  export let landingZones: LandpadResponse[];

  let showModal = false;
  let selectedLandingZone: LandpadResponse | null = null;

  // Function to open modal and set the selected landing zone
  function openModal(zone: LandpadResponse) {
    selectedLandingZone = zone;
    showModal = true;
  }

  // Function to close modal
  function closeModal() {
    showModal = false;
    selectedLandingZone = null;
  }

  // Handle modal being appended to the body
  onMount(() => {
    const body = document.querySelector("body");
    if (body) {
      // When the modal is opened, add a class to the body to prevent scrolling
      if (showModal) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    }

    // Cleanup when the component is destroyed or modal is closed
    return () => {
      if (body) {
        body.style.overflow = "auto"; // Ensure scrolling is restored when modal is closed
      }
    };
  });
</script>

<Table class="border border-gray-200 rounded-lg">
  <TableHead class="bg-gray-50 text-gray-500">
    <TableHeadCell>FULL NAME</TableHeadCell>
    <TableHeadCell>LOCATION NAME</TableHeadCell>
    <TableHeadCell>REGION</TableHeadCell>
    <TableHeadCell>DETAILS</TableHeadCell>
    <TableHeadCell>SUCCESS RATE</TableHeadCell>
    <TableHeadCell>WIKIPEDIA LINK</TableHeadCell>
    <TableHeadCell>STATUS</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each landingZones as item}
      <TableBodyRow>
        <TableBodyCell>{item.full_name}</TableBodyCell>
        <TableBodyCell>{item.locality}</TableBodyCell>
        <TableBodyCell>{item.region}</TableBodyCell>
        <TableBodyCell>
          <button
            on:click={() => openModal(item)}
            class="text-sm bg-gray-200 px-2 py-1 rounded-md hover:underline"
          >
            View Details
          </button>
        </TableBodyCell>
        <TableBodyCell>
          <div class="flex items-center gap-2">
            <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full bg-green-500 rounded-full"
                style={`width: ${Number((item.landing_successes / item.landing_attempts) * 100).toFixed(1)}%;`}
              ></div>
            </div>
            <span class="text-sm"
              >{Number(
                (item.landing_successes / item.landing_attempts) * 100
              ).toFixed(1)}%</span
            >
          </div>
        </TableBodyCell>
        <TableBodyCell>
          <a
            href={item.wikipedia}
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:text-blue-700"
          >
            <LinkOutline class="h-5 w-5 text-blue-500" />
          </a>
        </TableBodyCell>
        <TableBodyCell>
          <span
            class={`px-2 py-1 rounded-full text-xs ${
              item.status === "active"
                ? "bg-green-100 text-green-800"
                : item.status === "retired"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
            }`}
          >
            {item.status}
          </span>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>

<!-- Modal: Rendered at the Body Level -->
{#if showModal && selectedLandingZone}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white rounded-lg w-[640px] h-[380px] relative">
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button
        class="absolute top-6 right-4 text-gray-500 hover:text-gray-800"
        on:click={closeModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div class=" w-full p-6 border border-b border-gray-200">
        <h2 class="text-lg font-semibold font-inter text-[18px] leading-[27px] text-left">Details-{selectedLandingZone.full_name}</h2>
      </div>
      <div class=" w-full p-6">
        <p class="text-base font-normal font-inter text-[16px] leading-[24px] text-left text-gray-500">{selectedLandingZone.details}</p>
      </div>
    </div>
  </div>
{/if}
