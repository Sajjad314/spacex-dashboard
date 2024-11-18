<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { LinkOutline } from "flowbite-svelte-icons";
  import type { LandpadResponse } from "../interface/LandpadResponse";
  export let landingZones: LandpadResponse[];
  // // let landingZones = [
  //   {
  //     name: "Landing Zone 1",
  //     location: "Cape Canaveral",
  //     region: "Florida",
  //     successRate: 75,
  //     status: "Active",
  //   },
  //   {
  //     name: "Landing Zone 1",
  //     location: "Cape Canaveral",
  //     region: "Florida",
  //     successRate: 75,
  //     status: "Retired",
  //   },
  //   {
  //     name: "Landing Zone 1",
  //     location: "Cape Canaveral",
  //     region: "Florida",
  //     successRate: 75,
  //     status: "Active",
  //   },
  //   {
  //     name: "Landing Zone 1",
  //     location: "Cape Canaveral",
  //     region: "Florida",
  //     successRate: 0,
  //     status: "Under Construction",
  //   },
  //   {
  //     name: "Landing Zone 1",
  //     location: "Cape Canaveral",
  //     region: "Florida",
  //     successRate: 75,
  //     status: "Active",
  //   },
  //   {
  //     name: "Landing Zone 1",
  //     location: "Cape Canaveral",
  //     region: "Florida",
  //     successRate: 75,
  //     status: "Active",
  //   },
  // ];
</script>

<Table class=" border border-gray-200 rounded-lg">
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
            <LinkOutline class="h-5 w-5 text-blue-500" /></a
          >
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
