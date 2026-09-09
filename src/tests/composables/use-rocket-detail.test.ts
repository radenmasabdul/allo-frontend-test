import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createPinia } from "pinia";
import { defineComponent } from "vue";
import { useRocketDetail } from "@/views/rocket/composable/useRocketDetail";
import { fetchRocketById } from "@/services/rocket-service";
import type { Rocket } from "@/types/rocket";

const routeMock = { params: { id: "55" } };
vi.mock("vue-router", () => ({
  useRoute: () => routeMock,
}));

vi.mock("@/services/rocket-service", () => ({
  fetchRockets: vi.fn(),
  fetchRocketById: vi.fn(),
}));


function makeRocket(overrides: Partial<Rocket> = {}): Rocket {
  return {
    id: 55,
    name: "Falcon 9",
    full_name: "Falcon 9",
    description: "A reusable rocket",
    image_url: "https://example.com/f9.jpg",
    launch_cost: "50000000",
    maiden_flight: "2010-06-04",
    manufacturer: { id: 1, name: "SpaceX", country_code: "USA" },
    ...overrides,
  };
}

function mountUseRocketDetail() {
  let result!: ReturnType<typeof useRocketDetail>;

  const TestComponent = defineComponent({
    setup() {
      result = useRocketDetail();
      return () => null;
    },
  });

  mount(TestComponent, {
    global: { plugins: [createPinia()] },
  });

  return result;
}

describe("Use Rocket Detail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("memuat data roket yang sesuai dengan ID", async () => {
    vi.mocked(fetchRocketById).mockResolvedValueOnce(makeRocket());

    const result = mountUseRocketDetail();
    await flushPromises();

    expect(fetchRocketById).toHaveBeenCalledWith(55);
    expect(result.rocket.value?.id).toBe(55);
  });

  it("mengatur data rocket ke null dan mencatat kesalahan saat panggilan API gagal", async () => {
    vi.mocked(fetchRocketById).mockRejectedValueOnce(new Error("Not found"));

    const result = mountUseRocketDetail();
    await flushPromises();

    expect(result.rocket.value).toBeNull();
    expect(result.store.error).toBe("Not found");
  });

  it("menandai gambar sebagai gagal", () => {
    const result = mountUseRocketDetail();

    expect(result.imageFailed.value).toBe(false);
    result.onImageError();
    expect(result.imageFailed.value).toBe(true);
  });
});
