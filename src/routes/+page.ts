import type { LandpadResponse } from '../interface/LandpadResponse';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch("https://api.spacexdata.com/v4/landpads");
  const data: LandpadResponse[] = response.ok ? await response.json() : [];
  console.log(data);
  
  return { landingData: data }; // This data will be passed as props to +page.svelte
};
