<script lang="ts" setup>
withDefaults(defineProps<{ height?: number }>(), { height: 180 });
</script>

<template>
  <div
    class="d-flex align-center justify-center bg-grey-lighten-2"
    :style="{ height: `${height}px` }"
  >
    <v-icon
      icon="mdi-rocket-launch-outline"
      size="48"
      color="grey"
    />
  </div>
</template>