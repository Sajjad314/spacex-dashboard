<script lang="ts">
    import { LinkOutline } from "flowbite-svelte-icons";
    import type { LandpadResponse } from "../../interface/LandpadResponse";
  
    export let landingZones: LandpadResponse[];
  
    let showModal = false;
    let selectedLandingZone: LandpadResponse | null = null;
    function openModal(zone: LandpadResponse) {
      selectedLandingZone = zone;
      showModal = true;
    }
  
    function closeModal() {
      showModal = false;
      selectedLandingZone = null;
    }
  </script>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    {#each landingZones as item}
      <div class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <div class="p-4">
          <h2 class="text-lg font-bold text-gray-800">{item.full_name}</h2>
          <p class="text-sm text-gray-500 mb-2">{item.locality}, {item.region}</p>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full bg-green-500 rounded-full"
                style={`width: ${Number((item.landing_successes / item.landing_attempts) * 100).toFixed(1)}%;`}
              ></div>
            </div>
            <span class="text-sm text-gray-600">
              {Number((item.landing_successes / item.landing_attempts) * 100).toFixed(1)}%
            </span>
          </div>
          <p class="text-sm text-gray-700">{item.details.substring(0, 100)}...</p>
        </div>
        <div class="flex justify-between items-center bg-gray-50 p-4 border-t">
          <a
            href={item.wikipedia}
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:text-blue-700 flex items-center gap-1"
          >
            <LinkOutline class="h-5 w-5" />
            Wikipedia
          </a>
          <button
            on:click={() => openModal(item)}
            class="text-sm text-white bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600"
          >
            View Details
          </button>
        </div>
      </div>
    {/each}
  </div>
  
  {#if showModal && selectedLandingZone}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white rounded-lg w-full max-w-[640px] min-h-[380px] relative">
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
  