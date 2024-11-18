<script lang="ts">
  // @ts-nocheck

  import {
    Chart,
    Card,
    A,
    Button,
    Dropdown,
    DropdownItem,
    Popover,
    Tooltip,
  } from "flowbite-svelte";
  import {
    InfoCircleSolid,
    ArrowDownToBracketOutline,
    ChevronDownOutline,
    ChevronRightOutline,
    PenSolid,
    DownloadSolid,
    ShareNodesSolid,
  } from "flowbite-svelte-icons";
  import type { LandpadResponse } from "../interface/LandpadResponse";
  import { textHeights } from "ol/render/canvas";

  export let landingData: LandpadResponse[];

  let successRate: number[] = [];
  let labl: string[] = [];

  for (let i = 0; i < landingData.length; i++) {
    successRate.push(
      Number(landingData[i].landing_successes / landingData[i].landing_attempts).toFixed(2) * 100
    );
    labl.push(landingData[i].full_name);
  }

  const options = {
    series: successRate,
    colors: [
      "#1C64F2",
      "#16BDCA",
      "#FDBA8C",
      "#E74694",
      "#22177A",
      "#47663B",
      "#FAB12F",
    ],
    chart: {
      height: 320,
      width: "100%",
      type: "donut",
    },
    stroke: {
      colors: ["transparent"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: "Landing Pads",
              fontFamily: "Inter, sans-serif",
              textHeights: "30px",
              formatter: function (w) {
                const sum = w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
                return `${landingData.length}`;
              },
            },
            value: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: -20,
              formatter: function (value) {
                return value;
              },
            },
          },
          size: "80%",
        },
      },
    },
    grid: {
      padding: {
        top: -2,
      },
    },
    labels: labl,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
      position: "bottom",
    },
    yaxis: {
      labels: {
        formatter: function (/** @type {string} */ value) {
          return value;
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (/** @type {string} */ value) {
          return value + "k";
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };
</script>

<Card class="border border-gray-200 rounded-xl shadow-md">
  <div class="flex justify-between items-start w-full">
    <div class="flex-col items-center">
      <div class="flex items-center mb-1">
        <h1
          class=" m-4 font-inter text-[16px] font-semibold leading-6 text-left text-black"
        >
          Success Rate Chart
        </h1>
      </div>
    </div>
    <div class="flex justify-end items-center">
      <!-- <ArrowDownToBracketOutline class="w-3.5 h-3.5" /> -->
      <Tooltip>Download CSV</Tooltip>
    </div>
  </div>

  <Chart {options} class="py-6" />
</Card>
