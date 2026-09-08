import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRocketStore } from "@/stores/rocket";

export function useRockets() {
  const store = useRocketStore();
  const router = useRouter();

  const failedImages = ref<Set<number>>(new Set());

  function onImageError(id: number) {
    failedImages.value.add(id);
  };

  function loadData() {
    store.fetchAllData();
  };

  function goToDetail(id: number) {
    router.push(`/rockets/${id}`);
  };

  onMounted(loadData);

  return {
    store,
    failedImages,
    onImageError,
    loadData,
    goToDetail,
  };
};