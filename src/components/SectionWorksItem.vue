<script setup lang="ts">
import { computed } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { useIntersectAnimation } from '@/composables/intersectAnimation'
import IconLink from './IconLink.vue'

const { animationProgress, onIntersect } = useIntersectAnimation()

const animationTranslateStack = computed(() => `${animationProgress.value * 15 - 15}rem`)
const animationTranslateParagraph = computed(() => `${animationProgress.value * 10 - 10}rem`)
const animationTranslateTitle = computed(() => `${animationProgress.value * 5 - 5}rem`)

defineProps<{
  title: string,
  years: string,
  description: string,
  company: {
    link: string,
    name: string,
    color: string,
  },
  stack: string[],
}>()

const techColorsMap: { [key: string]: string } = {
  vue: '#42b883',
  nuxt: '#00dc82',
  webpack: '#75aecb',
  vuetify: '#1697f6',
  scss: '#cf649a',
  groovy: '#4298b8',
  postgresql: '#336791',
}
</script>

<template>
  <article 
    v-intersection-observer="[onIntersect, { threshold: 0.5 }]"
    class="article-works"
  >
    <div>
      <h2>{{ title }}</h2>     
      <h3>
        {{ years }} at 
        <a
          target="_blank"
          :href="company.link" 
          :style="{ 
            color: company.color,
            'font-weight': 400
          }"
          class="link"
        >
          {{ company.name }}
          <IconLink class="icon" />
        </a>
      </h3>
    </div>
    <p>{{ description }}</p>
    <p class="stack">
      <template      
        v-for="tech in stack"
        :key="tech"
      >
        <span
          :style="{
            color: techColorsMap[tech]
          }"
        >
          {{ tech }}
        </span>
        <span>, </span>
      </template>
    </p>
  </article>
</template>

<style scoped>
.article-works {
  display: flex;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: center;
  max-width: 50rem;
}

.article-works h2,
.article-works h3,
.article-works p {
  transform-origin: 0% 50%;
  opacity: v-bind(animationProgress);
  transform: translateX(v-bind(animationTranslateTitle));
}

.article-works p {
  transform: translateX(v-bind(animationTranslateParagraph));
}

.article-works div {
  margin: 2rem 0;
}

.article-works .stack {
  margin: 2rem 0;
  transform: translateX(v-bind(animationTranslateStack));
}

.article-works .stack > span:last-child {
  display: none;
}

.icon {
  opacity: 0;
  transform-origin: 50% 50%;
  transition: transform 0.6s cubic-bezier(0, 1, 0.18, 1),
    opacity 0.6s cubic-bezier(0, 1, 0.18, 1); 
}

.link:hover .icon, .link:focus .icon {
  opacity: 1;
}

@media (max-width: 800px) {
  .article-works h2,
  .article-works h3 {
    transform: translateY(v-bind(animationTranslateTitle));
  }

  .article-works p {
    transform: translateY(v-bind(animationTranslateParagraph));
  }

  .article-works .stack {
    transform: translateY(v-bind(animationTranslateStack));
  }
}
</style>