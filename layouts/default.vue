<script setup lang="ts">
const route = useRoute()

const links = [
  // {
  //   label: 'Profile',
  //   avatar: {
  //     src: 'https://avatars.githubusercontent.com/u/739984?v=4',
  //   },
  //   badge: 100,
  // },
  {
    label: 'GPT',
    icon: 'i-heroicons-home',
    to: '/gpt',
  },
  {
    label: 'Vertical Navigation',
    icon: 'i-heroicons-chart-bar',
    to: `${route.path.startsWith('/dev') ? '/dev' : ''}/components/vertical-navigation`,
  },
  {
    label: 'Command Palette',
    icon: 'i-heroicons-command-line',
    to: '/components/command-palette',
  },
]
const teams = [{
  label: 'Nuxt',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/23360933?s=200&v=4',
  },
  click: () => {
    team.value = teams[0]
  },
}, {
  label: 'NuxtLabs',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/62017400?s=200&v=4',
  },
  click: () => {
    team.value = teams[1]
  },
}]

const actions = [{
  label: 'Create team',
  icon: 'i-heroicons-plus-circle',
}, {
  label: 'Manage teams',
  icon: 'i-heroicons-cog-8-tooth',
}]
const team = ref(teams[0])
</script>

<template>
  <div class="fixed inset-0 flex overflow-hidden">
    <article
      class="relative hidden w-full flex-shrink-0 flex-col items-stretch border-b border-gray-200 lg:w-[255px] lg:flex lg:border-b-0 lg:border-r dark:border-gray-800"
    >
      <div
        class="h-[64px] min-w-0 flex flex-shrink-0 items-center gap-x-4 border-b border-gray-200 px-4 !border-transparent dark:border-gray-800"
      >
        <div class="min-w-0 flex flex-1 items-center justify-between gap-x-1.5 border-gray-200 dark:border-gray-800">
          <UDropdown
            v-slot="{ open }" :items="[teams, actions]" class="w-full border-gray-200 dark:border-gray-800" :ui="{ width: 'w-full' }"
            :popper="{ strategy: 'absolute' }"
          >
            <UButton color="gray" variant="outline" :class="[open && 'bg-gray-50 dark:bg-gray-800']" class="w-full border-gray-200 dark:border-gray-800">
              <div flex items-center justify-between w="100%">
                <div flex items-center>
                  <UAvatar :src="team.avatar.src" size="2xs" />
                  <span class="ml-2 truncate text-gray-900 font-semibold dark:text-white">{{ team.label }}</span>
                </div>
                <UIcon name="i-heroicons:chevron-up-down-solid" />
              </div>
            </UButton>
          </UDropdown>
        </div>
      </div>
      <div class="flex flex-1 flex-col gap-y-2 overflow-y-auto px-4">
        <UVerticalNavigation :links="links" />
      </div>
    </article>
    <div class="min-w-0 w-full flex flex-1">
      <main class="relative w-full flex flex-1 flex-col items-stretch">
        <header
          class="h-[64px] min-w-0 flex flex-shrink-0 items-center justify-between gap-x-4 border-b border-gray-200 px-4 dark:border-gray-800"
        >
          <div>
            Home
          </div>
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
