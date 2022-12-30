<script setup lang="ts">
import PageWorksItem from '@/components/SectionWorksItem.vue'

const WORKS = [
    {
        title: 'Frontend architect',
        years: '2022-nowadays',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat sunt porro ad, facilis voluptas assumenda quidem rem aliquam tenetur in vitae nihil explicabo itaque quaerat tempore soluta cumque a sequi.'
    },
    {
        title: 'Fullstack developer',
        years: '2020-2022',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat sunt porro ad, facilis voluptas assumenda quidem rem aliquam tenetur in vitae nihil explicabo itaque quaerat tempore soluta cumque a sequi.'
    }
]
</script>

<template>
  <section class="section-works">
    <PageWorksItem 
      v-for="(work, index) in WORKS"
      :key="index"
      :title="work.title"
      :years="work.years"
      :description="work.description"
    />
  </section>
</template>

<style scoped>
.section-works {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10rem;
  margin: 10rem 0;
}
</style>