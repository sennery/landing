<script setup lang="ts">
import Background from '@/components/BackgroundScene.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SectionAbout from '@/components/SectionAbout.vue'
import SectionWorks from '@/components/SectionWorks.vue'
import SectionContacts from '@/components/SectionContacts.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Arsenii Likhachev',
  link: [
    {
      rel: 'icon',
      sizes: 'any',
      href: '/favicon.ico'
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/icon.svg'
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'manifest',
      href: '/manifest.webmanifest'
    }
  ]
})
</script>

<template>
  <main>
    <SectionTitle class="snap-center" />
    <SectionAbout class="snap-center" />
    <SectionWorks />
    <SectionContacts class="snap-center" />
  </main>
  <Background />
</template>

<style scoped>
main > section {
  display: flex;
  flex-direction: column;
  justify-content: center;  
  transition: margin 0.6s cubic-bezier(0, 1, 0.18, 1),
    gap 0.6s cubic-bezier(0, 1, 0.18, 1); 
}

main > section > * {
  transform-origin: 50% 50%;
}

.snap-center {
  scroll-snap-align: center;
}
</style>
