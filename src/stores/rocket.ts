import { defineStore } from "pinia";
import type { Rocket } from "@/types/rocket";
import { fetchRockets, fetchRocketById } from "@/services/rocket-service";
import { generateLocaleId } from "@/utils/generate-locale-id";

interface RocketState {
  data: Rocket[];
  loading: boolean;
  error: string | null;
  filterText: string;
};

export const useRocketStore = defineStore('rocket', {
  state: (): RocketState => ({
    data: [],
    loading: false,
    error: null,
    filterText: ''
  }),

  getters: {
    filteredData(state): Rocket[] {
      const query = state.filterText.trim().toLowerCase();
      if(!query) return state.data;

      function matches(rocket: Rocket): boolean {
        const name = rocket.full_name?.toLowerCase() ?? '';
        const description = rocket.description?.toLowerCase() ?? '';
        return name.includes(query) || description.includes(query);
      };

      return state.data.filter(matches);
    },

    getDataById(state) {
      function findId(id: number): Rocket | undefined {
        return state.data.find((rocket) => rocket.id === id);
      };

      return findId;
    },
  },

  actions: {
    async fetchAllData() {
      this.loading = true;
      this.error = null;

      try {
        this.data = await fetchRockets();
      } catch (err) {
        this.error = err instanceof Error ? err.message : "Failed to load data";
      } finally {
        this.loading = false;
      };
    },

    async fetchDataByid(id: number): Promise<Rocket | null> {
      const cachedId = this.getDataById(id);
      if(cachedId) return cachedId;

      this.loading = true;
      this.error = null;

      try {
        const dataRocket = await fetchRocketById(id);
        this.data.push(dataRocket);
        return dataRocket;
      } catch (err) {
        this.error = err instanceof Error ? err.message : "Failed to load data";
        return null;
      } finally {
        this.loading = false;
      };
    },

    setFilter(text: string) {
      this.filterText = text;
    },

    addNewData(rocket: Omit<Rocket, 'id'>) {
      const newData = { ...rocket, id: generateLocaleId() } as const;
      this.data.unshift(newData);
      return newData;
    },
  },
});