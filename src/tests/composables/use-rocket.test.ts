import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createPinia } from "pinia";
import { defineComponent } from "vue";
import { useRockets } from "@/views/rocket/composable/useRockets";

const pushMock = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("@/services/rocket-service", () => ({
  fetchRockets: vi.fn().mockResolvedValue([]),
  fetchRocketById: vi.fn(),
}));

function mountUseRockets() {
  let result!: ReturnType<typeof useRockets>;

  const TestComponent = defineComponent({
    setup() {
      result = useRockets();
      return () => null;
    },
  });

  const wrapper = mount(TestComponent, {
    global: {
      plugins: [createPinia()],
    },
  });

  return { wrapper, result };
};

describe("Use Rockets", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("mengambil data roket secara otomatis saat dipasang", async () => {
    const { result } = mountUseRockets();
    await flushPromises();

    expect(result.store.loading).toBe(false);
    expect(result.store.error).toBeNull();
  });

  it("menandai gambar sebagai gagal", () => {
    const { result } = mountUseRockets();

    expect(result.failedImages.value.has(1)).toBe(false);
    result.onImageError(1);
    expect(result.failedImages.value.has(1)).toBe(true);
  });

  it("menavigasi ke rute detail data roket yang tepat", () => {
    const { result } = mountUseRockets();

    result.goToDetail(42);
    expect(pushMock).toHaveBeenCalledWith("/rocket/42");
  });

  it("membuka dialog tambah data roket", () => {
    const { result } = mountUseRockets();

    expect(result.isOpenDialog.value).toBe(false);
    result.handleOpen();
    expect(result.isOpenDialog.value).toBe(true);
  });
});