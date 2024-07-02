<script setup lang="ts">

useHead({
  title: 'Nuxt 3',
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <!-- <NuxtWelcome /> -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications :ui="{ position: 'top-0 bottom-auto' }" />
  </div>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #121827;
  color: white;
}
</style>
