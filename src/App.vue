<script setup lang="ts">
import Background from '@/components/BackgroundScene.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SectionAbout from '@/components/SectionAbout.vue'
import SectionWorks from '@/components/SectionWorks.vue'
import SectionContacts from '@/components/SectionContacts.vue'
</script>

<template>
  <main>
    <SectionTitle class="snap-center" />
    <SectionAbout class="snap-center" />
    <SectionWorks />
    <SectionContacts class="snap-center" />
  </main>
  <!-- <Background /> -->
</template>

<style scoped>
.snap-center {
  scroll-snap-align: center;
}
</style>
