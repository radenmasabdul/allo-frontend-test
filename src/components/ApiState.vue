<script lang="ts" setup>
defineProps<{
  loading: boolean;
  error: string | null;
}>();

const emit = defineEmits<{ retry: [] }>();

function handleRetry() {
  emit('retry');
};
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="d-flex flex-column align-center justify-center py-16"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="48"
      />
      <p class="mt-4 text-medium-emphasis">
        Loading...
      </p>
    </div>
    
    <div
      v-else-if="error"
      class="d-flex flex-column align-center justify-center py-16"
    >
      <v-alert
        type="error"
        variant="tonal"
        class="mb-4"
        max-width="480"
      >
        {{ error }}
      </v-alert>
      <v-btn
        color="primary"
        @click="handleRetry"
      >
        Retry
      </v-btn>
    </div>

    <slot v-else />
  </div>
</template>