<script lang="ts" setup>
import ApiState from '@/components/ApiState.vue';
import FallbackImage from '@/components/FallbackImage.vue';
import { formatCost } from '@/utils/format-cost';
import { formatDate } from '@/utils/format-date';
import { useRocketDetail } from './composable/useRocketDetail';
import NavButton from '@/components/NavButton.vue';

const { store, rocket, imageFailed, loadDetail, onImageError } = useRocketDetail();
</script>

<template>
  <v-container class="py-8">
    <NavButton
      to="/"
      label="Back to list"
      class="mb-4"
    />

    <api-state
      :loading="store.loading"
      :error="store.error"
      @retry="loadDetail"
    >
      <v-alert
        v-if="!rocket"
        type="warning"
        variant="tonal"
      >
        Data Rocket not found.
      </v-alert>

      <v-card v-else>
        <v-img
          v-if="rocket.image_url && !imageFailed"
          :src="rocket.image_url"
          height="320"
          cover
          @error="onImageError"
        />
        <FallbackImage
          v-else 
          :height="320"
        />

        <v-card-title class="text-h4">
          {{ rocket.full_name || 'Unnamed Rocket' }}
        </v-card-title>

        <v-card-text>
          <p class="mb-6">
            {{ rocket.description || 'No description available.' }}
          </p>

          <v-row class="border-t d-flex px-4 pb-4 pt-3 stats-row">
            <v-col
              cols="12"
              sm="4"
              class="stats-col"
            >
              <p class="text-caption text-medium-emphasis mb-1">
                Cost per launch
              </p>
              <p class="text-body-1 font-weight-medium">
                {{ formatCost(rocket.launch_cost) }}
              </p>
            </v-col>

            <v-col
              cols="12"
              sm="4"
              class="stats-col"
            >
              <p class="text-caption text-medium-emphasis mb-1">
                Country
              </p>
              <p class="text-body-1 font-weight-medium">
                {{ rocket.manufacturer?.country_code || '—' }}
              </p>
            </v-col>

            <v-col
              cols="12"
              sm="4"
              class="stats-col"
            >
              <p class="text-caption text-medium-emphasis mb-1">
                First flight
              </p>
              <p class="text-body-1 font-weight-medium">
                {{ formatDate(rocket.maiden_flight) }}
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </api-state>
  </v-container>
</template>

<style scoped>
.stats-col:not(:last-child) {
  border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  padding-bottom: 12px;
  margin-bottom: 12px;
}

@media (min-width: 600px) {
  .stats-col:not(:last-child) {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
    border-inline-end: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>