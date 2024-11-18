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
  import { boundingExtent } from "ol/extent";
  import type { LandpadResponse } from "../interface/LandpadResponse";

  export let landingData: LandpadResponse[];

  let locations: {
    name: string;
    latitude: number;
    longitude: number;
    status: string;
  }[] = [];

  if (landingData && landingData.length > 0) {
    for (let i = 0; i < landingData.length; i++) {
      locations.push({
        name: landingData[i].full_name,
        latitude: landingData[i].latitude,
        longitude: landingData[i].longitude,
        status: landingData[i].status,
      });
    }
  }
  console.log(locations);

  let map;

  onMount(() => {
    // Create a vector source and add each location as a feature
    const vectorSource = new VectorSource();

    locations.forEach((loc) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([loc.longitude, loc.latitude])),
      });

      let color = "#E1EFFE"; 
      if (loc.status === "active") {
        color = "#91F652";
      } else if (loc.status === "retired") {
        color = "#FDE8E8";
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

    // Calculate the extent of all features to fit the map
    const extent = vectorSource.getExtent();

    // Base map and vector layer
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
      view: new View(),
      controls: [],
    });

    // Fit the map view to show all locations within bounds
    map.getView().fit(extent, { padding: [50, 50, 50, 50] });
  });
</script>

<div class="border border-gray-200 rounded-xl shadow-md">
  <h1 class=" m-4 font-inter text-[16px] font-semibold leading-6 text-left">
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
