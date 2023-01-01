<script setup lang="ts">
import PageWorksItem from '@/components/SectionWorksItem.vue'

const works = [
  {
    title: 'frontend architect',
    years: '2022-nowadays',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat sunt porro ad, facilis voluptas assumenda quidem rem aliquam tenetur in vitae nihil explicabo itaque quaerat tempore soluta cumque a sequi.',
    company: {
      name: 'Freught',
      color: '#262c7a',
      link: 'https://freught.com/'
    },
  },
  {
    title: 'fullstack developer',
    years: '2020-2022',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat sunt porro ad, facilis voluptas assumenda quidem rem aliquam tenetur in vitae nihil explicabo itaque quaerat tempore soluta cumque a sequi.',
    company: {
      name: 'Rostelekom IT',
      color: '#7700ff',
      link: 'https://rtkit.ru/'
    },
  }
]
</script>

<template>
  <section class="section-works">
    <PageWorksItem 
      v-for="(work, index) in works"
      :key="index"
      :title="work.title"
      :years="work.years"
      :company="work.company"
      :description="work.description"
    />
  </section>
</template>

<style scoped>
.section-works {
  align-items: center;
  flex-wrap: wrap;
  gap: 10rem;
  margin: 20rem 0;
}

@media (max-width: 800px) {
  .section-works {
    margin: 10rem 0;
    gap: 5rem;
  }
}
</style>