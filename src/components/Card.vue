<script lang="ts" setup>
const emit = defineEmits<{ click: [] }>();
</script>

<template>
  <v-card
    class="h-100 d-flex flex-column cursor-pointer"
    @click="emit('click')"
  >
    <slot name="image" />

    <v-card-title class="d-flex align-center justify-space-between ga-2">
      <slot name="title" />
    </v-card-title>

    <v-card-text class="text-truncate-3 flex-grow-1">
      <slot name="text" />
    </v-card-text>

    <div
      v-if="$slots.footer"
      class="card-footer border-t d-flex px-4 pb-4 pt-3"
    >
      <slot name="footer" />
    </div>
  </v-card>
</template>

<style scoped>
.text-truncate-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
}
.card-footer :deep(.footer-item) {
  flex: 1;
}
</style>