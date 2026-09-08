<script lang="ts" setup>
defineProps<{ label?: string }>();
const model = defineModel<string>({ default: '' });
</script>

<template>
  <v-text-field
    v-model="model"
    :label="label ?? 'Filter'"
    prepend-inner-icon="mdi-magnify"
    clearable
    density="comfortable"
    variant="outlined"
    hide-details
  />
</template>