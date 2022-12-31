<script setup lang="ts">
import Background from '@/components/BackgroundScene.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SectionAbout from '@/components/SectionAbout.vue'
import SectionWorks from '@/components/SectionWorks.vue'
</script>

<template>
  <main>
    <SectionTitle class="section-snap" />
    <SectionAbout class="section-snap" />
    <SectionWorks />
  </main>
  <!-- <Background /> -->
</template>

<style scoped>
.section-snap {
  scroll-snap-align: center;
}
</style>
