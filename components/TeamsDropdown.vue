<script setup lang="ts">
const teams = [
  {
    label: "Nuxt",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/23360933?s=200&v=4",
    },
    click: () => {
      team.value = teams[0];
    },
  },
  {
    label: "NuxtLabs",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/62017400?s=200&v=4",
    },
    click: () => {
      team.value = teams[1];
    },
  },
];

const actions = [
  {
    label: "Create team",
    icon: "i-heroicons-plus-circle",
  },
  {
    label: "Manage teams",
    icon: "i-heroicons-cog-8-tooth",
  },
];

const team = ref(teams[0]);
</script>

<template>
  <UDropdown
    v-slot="{ open }"
    mode="hover"
    :items="[teams, actions]"
    class="w-full"
    :ui="{ width: 'w-full' }"
    :popper="{ strategy: 'absolute' }"
  >
    <UButton
      color="gray"
      :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      class="w-full"
    >
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center">
          <UAvatar :src="team.avatar.src" size="2xs" />
          <span
            class="ml-2 truncate text-gray-900 font-semibold dark:text-white"
            >{{ team.label }}</span
          >
        </div>
        <UIcon name="i-heroicons-chevron-up-down-solid" />
      </div>
      <!-- <UAvatar :src="team.avatar.src" size="2xs" />

      <span class="truncate text-gray-900 dark:text-white font-semibold">
        {{ team.label }}
      </span>

      <UIcon name="i-heroicons:chevron-up-down-solid" /> -->
    </UButton>
  </UDropdown>
</template>
