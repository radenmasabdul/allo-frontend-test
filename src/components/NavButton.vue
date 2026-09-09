<script lang="ts" setup>
withDefaults(
  defineProps<{
    to: string;
    label: string;
    icon?: string;
    iconPosition?: 'prepend' | 'append';
    variant?: 'text' | 'outlined' | 'flat' | 'tonal' | 'elevated' | 'plain'
  }>(),
  {
    icon: 'mdi-arrow-left',
    iconPosition: 'prepend',
    variant: 'text',
  },
);
</script>

<template>
  <v-btn
    :variant="variant"
    :prepend-icon="iconPosition === 'prepend' ? icon : undefined"
    :append-icon="iconPosition === 'append' ? icon : undefined"
    :to="to"
  >
    {{ label }}
  </v-btn>
</template>