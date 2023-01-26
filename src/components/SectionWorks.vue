<script setup lang="ts">
import PageWorksItem from '@/components/SectionWorksItem.vue'
import { computed } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { animateIntersectWorks } from '@/composables/three'
import { useIntersectAnimation } from '@/composables/intersectAnimation'

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

const { animationProgress, onIntersect } = useIntersectAnimation()

const animationTranslateTitle = computed(() => `${5 - animationProgress.value * 5}rem`)

const animateIntersectWorksThreshold = computed(() => 1 / works.length)
function onIntersection (entries: IntersectionObserverEntry[]) {
  const [{ isIntersecting }] = entries
  if (isIntersecting) {
    animateIntersectWorks()
  }
}
</script>

<template>
  <section
    v-intersection-observer="[onIntersection, { threshold: animateIntersectWorksThreshold }]"
    class="section-works"
  >
    <h2
      v-intersection-observer="[onIntersect, { threshold: 1 }]"
      class="title"
    >
      experience as
    </h2>
    <ul class="works-list">
      <PageWorksItem
        v-for="(work, index) in works"
        :key="index"
        :title="work.title"
        :years="work.years"
        :company="work.company"
        :description="work.description"
        :stack="work.stack"
      />
    </ul>
  </section>
</template>

<style scoped>
.section-works {
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10rem;
  margin: 10rem 0;
}

.section-works > .works-list {
  display: flex;
  flex-direction: column;
  gap: 10rem;
}

.section-works > .title {
  align-self: flex-end;
  position: sticky;
  left: 0;
  bottom: 50%;
  margin: 2rem 0;
  opacity: v-bind(animationProgress);
  transform: translateY(v-bind(animationTranslateTitle));
}

@media (max-width: 800px) {
  .section-works > .title {
    transform: translateY(calc(v-bind(animationTranslateTitle) * var(--animation-values-coef)));
  }
}

@media (max-width: 1200px) {
  .section-works {
    flex-wrap: wrap;
    gap: 0;
  }

  .section-works > .works-list {
    gap: 5rem;
  }

  .section-works > .title {
    position: static;
    margin-bottom: 0;
  }
}
</style>
