<script setup lang="ts">
import type { _padding } from "#tailwind-config/theme";

// const route = useRoute()

const links = [
  // {
  //   label: 'Profile',
  //   avatar: {
  //     src: 'https://avatars.githubusercontent.com/u/739984?v=4',
  //   },
  //   badge: 100,
  // },
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: "GPT账号",
    icon: "i-heroicons-chart-bar",
    to: "/gpt",
  },
  {
    label: "RedeemCode兑换码",
    icon: "i-heroicons-command-line",
    to: "/redeemcode",
  },
];
const teams = [
  {
    label: "Nuxt",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/23360933?s=200&v=4",
    },
    click: () => {
      // team.value = teams[0]
    },
  },
  {
    label: "NuxtLabs",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/62017400?s=200&v=4",
    },
    click: () => {
      // // team.value = teams[1]
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
  <div class="fixed inset-0 flex overflow-hidden">
    <article
      class="relative flex-shrink-0 flex-col items-stretch border-gray-200 w-[255px] flex border-b-0 border-r dark:border-gray-800"
    >
      <div
        class="h-[64px] min-w-0 flex flex-shrink-0 items-center gap-x-4 border-b border-gray-200 px-4 !border-transparent dark:border-gray-800"
      >
        <div class="min-w-0 flex flex-1 items-center justify-between gap-x-1.5">
          <TeamsDropdown />
        </div>
      </div>
      <div class="flex flex-1 flex-col gap-y-2 overflow-y-auto px-4">
        <UVerticalNavigation :links="links" />
      </div>
    </article>
    <div class="min-w-0 flex flex-1">
      <main class="relative flex flex-1 flex-col items-stretch">
        <header
          class="h-[64px] min-w-0 flex flex-shrink-0 items-center justify-between gap-x-4 border-b border-gray-200 px-4 dark:border-gray-800"
        >
          <div>Home</div>
          <DarkToggle />
        </header>
        <main class="flex flex-1 flex-col overflow-y-auto p-4">
          <slot />
        </main>
      </main>
    </div>
  </div>
  <!-- <main class="px-10 py-20 text-center">
    <slot />

    <div class="mx-auto mt-5 text-center text-sm opacity-25">
      [Default Layout]
    </div>
  </main> -->
</template>

<style scoped></style>
