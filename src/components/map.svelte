<script lang="ts">
  import { onMount } from "svelte";
  import { Map, View } from "ol";
  import TileLayer from "ol/layer/Tile";
  import OSM from "ol/source/OSM";
  import { fromLonLat } from "ol/proj";
  import { Feature } from "ol";
  import { Point } from "ol/geom";
  import { Vector as VectorLayer } from "ol/layer";
  import VectorSource from "ol/source/Vector";
  import { Style, Circle, Fill } from "ol/style";
  import type { LandpadResponse } from "../interface/LandpadResponse";

  let { landingData }: { landingData: LandpadResponse[] } = $props();

  let locations: {
    name: string;
    latitude: number;
    longitude: number;
    status: string;
  }[] = [];
  let map: Map;
  let vectorSource: VectorSource;

  // Reactive block to update locations whenever landingData changes
  $effect(()=>{
    if (landingData && landingData.length > 0) {
    locations = landingData.map((item) => ({
      name: item.full_name,
      latitude: item.latitude,
      longitude: item.longitude,
      status: item.status,
    }));

    // If vectorSource is initialized, update the map
    if (vectorSource) {
      updateFeatures();
    }
  }
  })

  // Function to update features on the map
  function updateFeatures() {
    vectorSource.clear(); // Clear existing features

    locations.forEach((loc) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([loc.longitude, loc.latitude])),
      });

      let color = "#E1EFFE";
      if (loc.status === "active") {
        color = "#91F652";
      } else if (loc.status === "retired") {
        color = "#B91C1C";
      }

      feature.setStyle(
        new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({ color: color }),
          }),
        })
      );

      vectorSource.addFeature(feature);
    });

    // Adjust the view based on the number of locations
    const extent = vectorSource.getExtent();
    if (!extent.every((value) => isFinite(value))) return; // Avoid errors for empty extent

    if (locations.length === 1) {
      // Center the map on the single location and set a reasonable zoom level
      const [lon, lat] = [locations[0].longitude, locations[0].latitude];
      map.getView().setCenter(fromLonLat([lon, lat]));
      map.getView().setZoom(10); // Adjust zoom level as needed
    } else {
      // Fit the map view to show all locations within bounds
      map.getView().fit(extent, { padding: [50, 50, 50, 50] });
    }
  }

  onMount(() => {
    // Initialize vector source and map
    vectorSource = new VectorSource();

    map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource,
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]), // Default center
        zoom: 2, // Default zoom
      }),
      controls: [],
    });

    // Initial feature update
    updateFeatures();
  });
</script>

<div class="border border-gray-200 rounded-xl shadow-md">
  <h1 class="m-4 font-inter text-[16px] font-semibold leading-6 text-left">
    Map View
  </h1>
  <div id="map"></div>
</div>

<style>
  #map {
    width: 100%;
    height: 355px;
    border-radius: 12px;
  }
</style>
