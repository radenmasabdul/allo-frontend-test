export interface RocketManufacture {
  id: number;
  url: string;
  name: string;
  featured: boolean;
  type: string;
  country_code: string;
  abbrev: string;
  description: string;
  administrator: string;
  founding_year: string;
  launchers: string;
  spacecraft: string;
  launch_library_url: string | null;
  total_launch_count: number;
  consecutive_successful_launches: number;
  successful_launches: number;
  failed_launches: number;
  pending_launches: number;
  consecutive_successful_landings: number;
  successful_landings: number;
  failed_landings: number;
  attempted_landings: number;
  info_url: string;
  wiki_url: string;
  logo_url: string;
  image_url: string;
  nation_url: string
};

export interface Rocket {
  id: number;
  url: string;
  name: string;
  active: boolean;
  reusable: boolean;
  description: string | null;
  family: string;
  full_name: string;
  manufacturer: RocketManufacture | null;
  program: [];
  variant: string;
  alias: string;
  min_stage: number;
  max_stage: number;
  length: number;
  diameter: number;
  maiden_flight: string | null;
  launch_cost: string | null;
  launch_mass: number;
  leo_capacity: number;
  gto_capacity: number | null;
  to_thrust: number;
  apogee: number | null;
  vehicle_range: number | null;
  image_url: string | null;
  info_url: string | null;
  wiki_url: string;
  total_launch_count: number;
  consecutive_successful_launches: number;
  successful_launches: number;
  failed_launches: number;
  pending_launches: number;
  attempted_landings: number;
  successful_landings: number;
  failed_landings: number;
  consecutive_successful_landings: number;
};

export interface RocketListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Rocket[]
};
