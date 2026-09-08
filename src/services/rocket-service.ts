import apiClient from "./api-client";
import type { Rocket, RocketListResponse } from "@/types/rocket";

export async function fetchRockets(): Promise<Rocket[]> {
  const { data } = await apiClient.get<RocketListResponse>(
    "/config/launcher/",
    {
      params: {
        manufacturer__name: "SpaceX",
        mode: "detailed",
        limit: 20,
      },
    },
  );

  return data.results;
};

export async function fetchRocketById(id:number): Promise<Rocket> {
  const { data } = await apiClient.get<Rocket>(`/config/launcher/${id}/`, {
    params: { mode: "detailed" },
  });

  return data;
};