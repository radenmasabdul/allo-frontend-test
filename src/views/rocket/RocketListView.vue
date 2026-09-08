<script lang="ts" setup>
import ApiState from '@/components/ApiState.vue';
import Card from '@/components/Card.vue';
import FallbackImage from '@/components/FallbackImage.vue';
import Filter from '@/components/Filter.vue';
import { formatCost } from '@/utils/format-cost';
import { formatDate } from '@/utils/format-date';
import { useRockets } from '@/composable/useRockets';

const {
  failedImages,
  goToDetail,
  loadData,
  onImageError,
  store,
} = useRockets();
</script>

<template>
  <v-container class="py-8">
    <h1 class="text-h4 mb-6">
      SpaceX Rockets
    </h1>

    <Filter
      :model-value="store.filterText"
      label="Filter rockets by name or description"
      class="mb-6"
      @update:model-value="store.setFilter($event ?? undefined)"
    />

    <ApiState
      :loading="store.loading"
      :error="store.error"
      @retry="loadData"
    >
      <v-alert
        v-if="store.filteredData.length === 0"
        type="info"
        variant="tonal"
      >
        No data match your filter.
      </v-alert>

      <v-row v-else>
        <v-col
          v-for="rocket in store.filteredData"
          :key="rocket.id"
          cols="12"
          sm="6"
          md="4"
        >
          <Card @click="goToDetail(rocket.id)">
            <template #image>
              <v-img
                v-if="rocket.image_url && !failedImages.has(rocket.id)"
                :src="rocket.image_url"
                height="180"
                cover
                @error="onImageError(rocket.id)"
              />
              <FallbackImage v-else />
            </template>

            <template #title>
              <span class="text-truncate">
                {{ rocket.full_name || 'Unnamed rocket' }}
              </span>
              <span
                v-if="rocket.manufacturer?.country_code"
                class="text-caption text-medium-emphasis d-flex align-center ga-1 flex-shrink-0"
              >
                <v-icon
                  icon="mdi-flag-outline"
                  size="16"
                />
                {{ rocket.manufacturer.country_code }}
              </span>
            </template>

            <template #text>
              {{ rocket.description || 'No description available.' }}
            </template>

            <template #footer>
              <div class="footer-item">
                <p class="text-caption text-medium-emphasis mb-1">
                  Cost per launch
                </p>
                <p class="text-body-2 font-weight-medium">
                  {{ formatCost(rocket.launch_cost) }}
                </p>
              </div>
              
              <v-divider
                vertical
                class="mx-4"
              />
              
              <div class="footer-item">
                <p class="text-caption text-medium-emphasis mb-1">
                  Maiden flight
                </p>
                <p class="text-body-2 font-weight-medium">
                  {{ formatDate(rocket.maiden_flight) }}
                </p>
              </div>
            </template>
          </Card>
        </v-col>
      </v-row>
    </ApiState>
  </v-container>
</template>