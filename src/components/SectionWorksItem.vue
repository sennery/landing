<script setup lang="ts">
import { computed } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { useIntersectionAnimation } from '@/composables/intersectAnimation'
import IconLink from './IconLink.vue'

defineProps<{
  title: string
  years: string
  description: string
  company: {
    link: string
    name: string
    color: string
  }
  stack: string[]
}>()

const { animationProgress, animateIntersection: onIntersection } = useIntersectionAnimation()

const animationTranslateStack = computed(() => `${animationProgress.value * 10 - 10}rem`)
const animationTranslateParagraph = computed(() => `${animationProgress.value * 7.5 - 7.5}rem`)
const animationTranslateTitle = computed(() => `${animationProgress.value * 5 - 5}rem`)
</script>

<template>
  <article
    v-intersection-observer="[onIntersection, { threshold: 0.5 }]"
    class="article-works"
  >
    <div>
      <h2>{{ title }}</h2>
      <h3>
        {{ years }} at
        <a
          target="_blank"
          :href="company.link"
          class="link"
        >
          {{ company.name }}
          <IconLink class="icon" />
        </a>
      </h3>
    </div>
    <p>{{ description }}</p>
    <p class="stack">
      <span>[ </span>
      <template
        v-for="tech in stack"
        :key="tech"
      >
        <span>
          {{ tech }}
        </span>
        <span>, </span>
      </template>
      <span> ]</span>
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
.article-works :is(h2, h3, p) {
  transform-origin: 0 50%;
  opacity: v-bind(animationProgress);
  transform: translateX(v-bind(animationTranslateTitle));
}
.article-works > p {
  transform: translateX(v-bind(animationTranslateParagraph));
}
.article-works > :is(div, .stack) {
  margin: 2rem 0;
}
.article-works > .stack {
  transform: translateX(v-bind(animationTranslateStack));
}
.article-works > .stack > span {
  color: var(--color-text-secondary);
  font-size: 0.9em;
}
.article-works > .stack > span:nth-last-child(-n + 2):not(:last-child) {
  display: none;
}

.icon {
  opacity: 0;
  transform-origin: 50% 50%;
  transition: transform 0.6s cubic-bezier(0, 1, 0.18, 1),
  opacity 0.6s cubic-bezier(0, 1, 0.18, 1);
}

.link {
  color: var(--color-text-highlight);
  font-weight: 400;
}
.link:is(:hover, :focus) .icon {
  opacity: 1;
}

@media (max-width: 800px) {
  .article-works :is(h2, h3) {
    transform: translateY(calc(v-bind(animationTranslateTitle) * var(--animation-values-coef)));
  }
  .article-works > p {
    transform: translateY(calc(v-bind(animationTranslateParagraph) * var(--animation-values-coef)));
  }
  .article-works > .stack {
    transform: translateY(calc(v-bind(animationTranslateStack) * var(--animation-values-coef)));
  }
}
</style>
