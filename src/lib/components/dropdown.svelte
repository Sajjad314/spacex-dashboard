<script lang="ts">
  import { Button, Dropdown, DropdownItem, Radio } from "flowbite-svelte";
  import {
    ChevronDownOutline,
    AdjustmentsVerticalOutline,
  } from "flowbite-svelte-icons";

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  let dropdownOption = ["active", "retired", "under construction"];
  let {
    selectedVal,
    onSetSelectedValue,
  }: { selectedVal: string; onSetSelectedValue: Function } = $props();
  let sv = $state(selectedVal);

  $effect(() => {
    onSetSelectedValue(sv);
  });
</script>

<Button
  class="rounded-md py-3 px-6 bg-gray-200 text-black font-medium flex gap-1 focus:text-blue-500 dark:text-white"
  ><AdjustmentsVerticalOutline
    class="w-6 h-6 ms-2 text-inherit"
  />Filter By Status<ChevronDownOutline
    class="w-6 h-6 ms-2 text-inherit"
  /></Button
>
<Dropdown
  class="p-3 space-y-1 border border-gray-200 bg-white shadow-lg rounded-md"
>
  {#each dropdownOption as option}
    <li
      class="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
    >
      <Radio name={sv} bind:group={sv} value={option} class="mr-2" />
      <span class=" font-medium text-lg">{capitalizeFirstLetter(option)}</span>
    </li>
  {/each}
</Dropdown>
