export interface LandpadResponse {
    images: Images
    name: string
    full_name: string
    status: string
    type: string
    locality: string
    region: string
    latitude: number
    longitude: number
    landing_attempts: number
    landing_successes: number
    wikipedia: string
    details: string
    launches: string[]
    id: string
  }
  
  interface Images {
    large: string[]
  }
  