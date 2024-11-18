<script lang="ts">
  import { Button, Dropdown, DropdownItem, Radio } from "flowbite-svelte";
  import {
    ChevronDownOutline,
    AdjustmentsVerticalOutline,
  } from "flowbite-svelte-icons";
  let dropdownValue = "active";

  function capitalizeFirstLetter(str:string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

  let dropdownOption = ["active", "retired", "under construction"]
  console.log(dropdownValue);
  
</script>

<Button
  class="rounded-md py-3 px-6 bg-gray-200 text-black font-medium flex gap-1 "
  ><AdjustmentsVerticalOutline
    class="w-6 h-6 ms-2 text-black dark:text-white"
  />Filter By Status<ChevronDownOutline
    class="w-6 h-6 ms-2 text-black dark:text-white"
  /></Button>
    <Dropdown class="p-3 space-y-1 border border-gray-200 bg-white shadow-lg rounded-md">
      {#each dropdownOption as option}
      <li class="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
        <Radio name="group2" bind:group={dropdownValue} value={option} class="mr-2" />
        <span class=" font-medium text-lg">{capitalizeFirstLetter(option)}</span>
      </li>
      {/each}

    </Dropdown>
  
