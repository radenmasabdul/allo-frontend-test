import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useRocketStore } from "@/stores/rocket";
import type { Rocket } from "@/types/rocket";
import { fetchRockets, fetchRocketById } from "@/services/rocket-service";

vi.mock("@/services/rocket-service", () => ({
  fetchRockets: vi.fn(),
  fetchRocketById: vi.fn(),
}));

vi.mock("@/utils/generate-locale-id", () => ({
  generateLocaleId: vi.fn(() => 999999),
}));

function makeRocket(overrides: Partial<Rocket> = {}): Rocket {
  return {
    id: 1,
    name: "Falcon 9",
    full_name: "Falcon 9",
    description: "A reusable rocket",
    image_url: null,
    launch_cost: "50000000",
    maiden_flight: "2010-06-04",
    manufacturer: { id: 1, name: "SpaceX", country_code: "USA" },
    ...overrides,
  };
};

describe("Use Rocket Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe("Fetch All Data", () => {
    it("memuat data roket dan menghapus error jika berhasil", async () => {
      vi.mocked(fetchRockets).mockResolvedValueOnce([makeRocket()]);

      const store = useRocketStore();
      await store.fetchAllData();

      expect(store.data).toHaveLength(1);
      expect(store.error).toBeNull();
      expect(store.loading).toBe(false);
    });

    it("mengatur pesan error dan membiarkan data tetap kosong jika terjadi kegagalan", async () => {
      vi.mocked(fetchRockets).mockRejectedValueOnce(new Error("Network error"));

      const store = useRocketStore();
      await store.fetchAllData();

      expect(store.error).toBe("Network error");
      expect(store.data).toHaveLength(0);
      expect(store.loading).toBe(false);
    });
  });

  describe("Filtered Data", () => {
    it("mengembalikan semua data roket saat filter teks kosong", async () => {
      vi.mocked(fetchRockets).mockResolvedValueOnce([
        makeRocket({ id: 1, full_name: "Falcon 9" }),
        makeRocket({ id: 2, full_name: "Starship" }),
      ]);

      const store = useRocketStore();
      await store.fetchAllData();

      expect(store.filteredData).toHaveLength(2);
    });

    it("memfilter berdasarkan nama, tidak membedakan huruf besar/kecil", async () => {
      vi.mocked(fetchRockets).mockResolvedValueOnce([
        makeRocket({ id: 1, full_name: "Falcon 9" }),
        makeRocket({ id: 2, full_name: "Starship" }),
      ]);

      const store = useRocketStore();
      await store.fetchAllData();
      store.setFilter("STAR");

      expect(store.filteredData).toHaveLength(1);
      expect(store.filteredData[0].full_name).toBe("Starship");
    });

    it("memfilter berdasarkan deskripsi", async () => {
      vi.mocked(fetchRockets).mockResolvedValueOnce([
        makeRocket({
          id: 1,
          full_name: "Falcon 9",
          description: "reusable orbital rocket",
        }),
        makeRocket({
          id: 2,
          full_name: "Starship",
          description: "next-gen spacecraft",
        }),
      ]);

      const store = useRocketStore();
      await store.fetchAllData();
      store.setFilter("orbital");

      expect(store.filteredData).toHaveLength(1);
      expect(store.filteredData[0].id).toBe(1);
    });
  });

  describe("Fetch Data By Id", () => {
    it("mengembalikan data rocket yang tersimpan di cache tanpa memanggil API lagi", async () => {
      vi.mocked(fetchRockets).mockResolvedValueOnce([makeRocket({ id: 55 })]);

      const store = useRocketStore();
      await store.fetchAllData();

      const result = await store.fetchDataByid(55);

      expect(result?.id).toBe(55);
      expect(fetchRocketById).not.toHaveBeenCalled();
    });

    it("memanggil API saat data roket tidak ada di cache", async () => {
      vi.mocked(fetchRocketById).mockResolvedValueOnce(makeRocket({ id: 77 }));

      const store = useRocketStore();
      const result = await store.fetchDataByid(77);

      expect(result?.id).toBe(77);
      expect(fetchRocketById).toHaveBeenCalledWith(77);
      expect(store.data).toHaveLength(1);
    });

    it("mengatur error dan mengembalikan null saat panggilan API gagal", async () => {
      vi.mocked(fetchRocketById).mockRejectedValueOnce(new Error("Not found"));

      const store = useRocketStore();
      const result = await store.fetchDataByid(999);

      expect(result).toBeNull();
      expect(store.error).toBe("Not found");
    });
  });

  describe("Add New Data", () => {
    it("menambahkan data roket baru ke daftar", async () => {
      vi.mocked(fetchRockets).mockResolvedValueOnce([makeRocket({ id: 1 })]);

      const store = useRocketStore();
      await store.fetchAllData();

      const newRocket = store.addNewData({
        name: "Custom Rocket",
        full_name: "Custom Rocket",
        description: null,
        image_url: null,
        launch_cost: null,
        maiden_flight: null,
        manufacturer: null,
      });

      expect(store.data).toHaveLength(2);
      expect(store.data[0]).toEqual(newRocket);
      expect(newRocket.id).toBeDefined();
    });
  });
});
