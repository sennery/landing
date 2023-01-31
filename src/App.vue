<script setup lang="ts">
import Background from '@/components/BackgroundScene.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SectionAbout from '@/components/SectionAbout.vue'
import SectionWorks from '@/components/SectionWorks.vue'
import SectionContacts from '@/components/SectionContacts.vue'
import { useHead } from '@vueuse/head'

const description = 'Hi, my name is Arsenii Likhachev aka sennery. I am a web developer and I build complex web applications with intuitive design. Love to develop and learn new things.'

useHead({
  title: 'Arsenii Likhachev · sennery',
  link: [
    { rel: 'icon', sizes: 'any', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/manifest.webmanifest' },
  ],
  meta: [
    { name: 'description', content: description },
    { name: 'author', content: 'sennery' },
    { property: 'og:title', content: 'Arsenii Likhachev' },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://sennery.dev' },
    { property: 'og:image', content: 'https://sennery.dev/share-image.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Arsenii Likhachev' },
    { name: 'twitter:description', content: description },
    { name: 'twitter:domain', content: 'sennery.dev' },
    { name: 'twitter:url', content: 'https://sennery.dev' },
    { name: 'twitter:image', content: 'https://sennery.dev/share-image.png' },
  ],
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
