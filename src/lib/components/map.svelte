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
  import type { LandpadResponse } from "../../interface/LandpadResponse";

  let { landingData }: { landingData: LandpadResponse[] } = $props();

  let locations: {
    name: string;
    latitude: number;
    longitude: number;
    status: string;
  }[] = [];
  let map: Map;
  let vectorSource: VectorSource;

  $effect(() => {
    if (landingData && landingData.length > 0) {
      locations = landingData.map((item) => ({
        name: item.full_name,
        latitude: item.latitude,
        longitude: item.longitude,
        status: item.status,
      }));

      if (vectorSource) {
        updateFeatures();
      }
    }
  });

  function updateFeatures() {
    vectorSource.clear();

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

    const extent = vectorSource.getExtent();
    if (!extent.every((value) => isFinite(value))) return;

    if (locations.length === 1) {
      const [lon, lat] = [locations[0].longitude, locations[0].latitude];
      map.getView().setCenter(fromLonLat([lon, lat]));
      map.getView().setZoom(10);
    } else {
      map.getView().fit(extent, { padding: [50, 50, 50, 50] });
    }
  }

  onMount(() => {
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
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
      controls: [],
    });

    updateFeatures();
  });
</script>

<div id="map"></div>

<style>
  #map {
    width: 100%;
    height: 355px;
    border-radius: 12px;
  }
</style>
