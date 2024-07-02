<script setup lang="ts">
const links = [
  {
    label: "GPT账号",
    icon: "i-heroicons-home",
    to: "/gpt",
  },
  {
    label: "RedeemCode兑换码",
    icon: "i-heroicons-home",
    to: "/redeemcode",
  },
  // {
  //   label: 'Vertical Navigation',
  //   icon: 'i-heroicons-chart-bar',
  //   to: `${route.path.startsWith('/dev') ? '/dev' : ''}/components/vertical-navigation`,
  // },
  // {
  //   label: 'Command Palette',
  //   icon: 'i-heroicons-command-line',
  //   to: '/components/command-palette',
  // },
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
      class="relative hidden flex-shrink-0 flex-col items-stretch border-b border-gray-200 lg:w-[255px] lg:flex lg:border-b-0 lg:border-r dark:border-gray-800"
    >
      <div
        class="h-[64px] min-w-0 flex flex-shrink-0 items-center gap-x-4 border-b border-gray-200 px-4 !border-transparent dark:border-gray-800"
      >
        <div class="min-w-0 flex flex-1 items-center justify-between gap-x-1.5">
          <slot name="sidebar" />
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
</template>

<style scoped></style>
