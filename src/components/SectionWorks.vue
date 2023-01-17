<script setup lang="ts">
import PageWorksItem from '@/components/SectionWorksItem.vue'
import { vIntersectionObserver } from '@vueuse/components'
import { animateIntersectWorks } from '@/composables/three'

const works = [
  {
    title: 'frontend architect',
    years: '2022-nowadays',
    description: 'I created a frontend architecture and design from scratch for the dynamically growing startup. I was implementing them with further scaling of the app and development of new features. Established the working process in the team and mentored junior staff.',
    company: {
      name: 'Freught',
      color: '#262c7a',
      link: 'https://freught.com/',
    },
    stack: ['vue', 'nuxt', 'vuetify', 'scss'],
  },
  {
    title: 'fullstack developer',
    years: '2020-2022',
    description: 'I was developing interface, components and backend for a large CRM B2B system in the telecom market leader company. Integrated in the team of 40 people. Contributed to architecture development.',
    company: {
      name: 'Rostelekom IT',
      color: '#7700ff',
      link: 'https://rtkit.ru/',
    },
    stack: ['vue', 'webpack', 'groovy', 'postgresql'],
  },
]

function onIntersection ([{ isIntersecting }]: Array<{ isIntersecting: boolean }>) {  
  if (isIntersecting) {
    animateIntersectWorks()
  }
}
</script>

<template>
  <section 
    v-intersection-observer="[onIntersection, { threshold: 0.5 }]"
    class="section-works"
  >
    <PageWorksItem 
      v-for="(work, index) in works"
      :key="index"
      :title="work.title"
      :years="work.years"
      :company="work.company"
      :description="work.description"
      :stack="work.stack"
    />
  </section>
</template>

<style scoped>
.section-works {
  align-items: center;
  flex-wrap: wrap;
  gap: 10rem;
  margin: 10rem 0;
}

@media (max-width: 800px) {
  .section-works {
    gap: 5rem;
  }
}
</style>