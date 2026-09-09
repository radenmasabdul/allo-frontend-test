<script lang="ts" setup>
withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    submitText?: string;
    loading?: boolean;
  }>(),
  {
    title: 'Add New',
    submitText: 'Save',
    loading: false,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  submit: [];
}>();

function close() {
  emit('update:modelValue', false);
};

function submit() {
  emit('submit');
};
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    :persistent="loading"
    max-width="600"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <span class="text-h6">
          {{ title }}
        </span>

        <v-btn
          icon="mdi-close"
          variant="text"
          @click="close"
        />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <slot />
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-4">
        <v-spacer />

        <v-btn
          variant="text"
          @click="close"
        >
          Cancel
        </v-btn>

        <v-btn
          color="primary"
          :loading="loading"
          :disabled="loading"
          @click="submit"
        >
          {{ submitText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>