import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useRocketStore } from "@/stores/rocket";
import type { Rocket } from "@/types/rocket";

export function useRocketDetail() {
  const route = useRoute();
  const store = useRocketStore();

  const id = computed(() => Number(route.params.id));
  const rocket = ref<Rocket | null>(null);
  const imageFailed = ref<boolean>(false);

  async function loadDetail() {
    imageFailed.value = false;
    rocket.value = await store.fetchDataByid(id.value);
  };

  function onImageError() {
    imageFailed.value = true;
  };

  onMounted(loadDetail);

  return {
    store,
    rocket,
    imageFailed,
    loadDetail,
    onImageError,
  };
};