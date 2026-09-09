<script lang="ts" setup>
import Dialog from '@/components/Dialog.vue';
import { useRocketForm, type RocketPayload } from '../composable/useRocketForm';
import { useRocketStore } from '@/stores/rocket';
import type { Rocket } from "@/types/rocket";

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const rocketStore = useRocketStore();

const {
  name,
  nameProps,
  imageUrl,
  imageUrlProps,
  launchCost,
  launchCostProps,
  countryCode,
  country,
  countryProps,
  maidenFlight,
  maidenFlightProps,
  description,
  descriptionProps,
  errors,
  isSubmitting,
  handleDialogChange,
  submitForm,
} = useRocketForm(async (payload: RocketPayload) => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  rocketStore.addNewData({
    name: payload.name,
    full_name: payload.name,
    description: payload.description ?? null,
    image_url: payload.image_url ?? null,
    launch_cost: payload.launch_cost ?? null,
    maiden_flight: payload.maiden_flight ?? null,
    manufacturer: payload.country_code
      ? ({ country_code: payload.country_code } as Rocket['manufacturer'])
      : null,
  });

  emit('update:modelValue', false);
});
</script>

<template>
  <Dialog
    :model-value="modelValue"
    :loading="isSubmitting"
    @update:model-value="(value) => {
      handleDialogChange(value);
      emit('update:modelValue', value);
    }"
    @submit="submitForm"
  >
    <v-text-field
      v-model="name"
      v-bind="nameProps"
      :error-messages="errors.name"
      label="Rocket Name"
      placeholder="Enter rocket name"
      variant="outlined"
      class="mb-3"
    />

    <v-text-field
      v-model="imageUrl"
      v-bind="imageUrlProps"
      :error-messages="errors.image_url"
      label="Image URL"
      placeholder="https://example.com/rocket.jpg"
      variant="outlined"
      class="mb-3"
    />

    <v-text-field
      v-model="launchCost"
      v-bind="launchCostProps"
      :error-messages="errors.launch_cost"
      label="Cost per Launch"
      placeholder="Enter cost"
      variant="outlined"
      class="mb-3"
      @keypress="(e: KeyboardEvent) => { if (!/\d/.test(e.key)) e.preventDefault() }"
    />

    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-select
          v-model="country"
          v-bind="countryProps"
          :error-messages="errors.country_code"
          label="Country"
          placeholder="Select country"
          :items="countryCode"
          variant="outlined"
        />
      </v-col>
      
      <v-col
        cols="12"
        sm="6"
      >
        <v-date-input
          v-model="maidenFlight"
          v-bind="maidenFlightProps"
          :error-messages="errors.maiden_flight"
          label="First Flight"
          prepend-icon=""
          prepend-inner-icon="$calendar"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-textarea
      v-model="description"
      v-bind="descriptionProps"
      :error-messages="errors.description"
      label="Description"
      placeholder="Enter rocket description"
      variant="outlined"
      rows="4"
    />
  </Dialog>
</template>