import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { useRocketForm, type RocketPayload } from "@/views/rocket/composable/useRocketForm";

function mountUseRocketForm(onSuccess: (payload: RocketPayload) => Promise<void>) {
  let result!: ReturnType<typeof useRocketForm>;

  const TestComponent = defineComponent({
    setup() {
      result = useRocketForm(onSuccess);
      return () => null;
    },
  });

  mount(TestComponent);

  return result;
};

describe("Use Rocket Form", () => {
  it("memanggil onSuccess dengan payload yang telah ditransformasi saat formulir valid", async () => {
    const onSuccess = vi.fn();
    const form = mountUseRocketForm(onSuccess);

    form.name.value = "Falcon Heavy";
    form.imageUrl.value = "https://example.com/rocket.jpg";
    form.launchCost.value = "90000000";
    form.country.value = "USA";
    form.maidenFlight.value = new Date(2018, 1, 6);
    form.description.value = "Heavy-lift rocket";

    await form.submitForm();

    expect(onSuccess).toHaveBeenCalledTimes(1);
    const payload = onSuccess.mock.calls[0][0] as RocketPayload;
    expect(payload.name).toBe("Falcon Heavy");
    expect(payload.maiden_flight).toBe("2018-02-06");
  });

  it("tidak memanggil onSuccess saat ada kolom wajib yang belum diisi", async () => {
    const onSuccess = vi.fn();
    const form = mountUseRocketForm(onSuccess);

    form.imageUrl.value = "https://example.com/rocket.jpg";

    await form.submitForm();

    expect(onSuccess).not.toHaveBeenCalled();
    expect(form.errors.value.name).toBeTruthy();
  });

  it("menolak launch cost yang bukan berupa angka", async () => {
    const onSuccess = vi.fn();
    const form = mountUseRocketForm(onSuccess);

    form.name.value = "Falcon Heavy";
    form.imageUrl.value = "https://example.com/rocket.jpg";
    form.launchCost.value = "expensive";
    form.country.value = "USA";
    form.maidenFlight.value = new Date(2018, 1, 6);
    form.description.value = "Heavy-lift rocket";

    await form.submitForm();

    expect(onSuccess).not.toHaveBeenCalled();
    expect(form.errors.value.launch_cost).toBeTruthy();
  });

  it("mereset formulir saat dialog ditutup", () => {
    const onSuccess = vi.fn();
    const form = mountUseRocketForm(onSuccess);

    form.name.value = "Falcon Heavy";
    form.handleDialogChange(false);

    expect(form.name.value).toBeFalsy();
  });
});
