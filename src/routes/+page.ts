import type { LandpadResponse } from "../interface/LandpadResponse";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10 seconds

  try {
    const response = await fetch("https://api.spacexdata.com/v4/landpads", {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data: LandpadResponse[] = await response.json();
    return { landingData: data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { landingData: [] };
  }
};
