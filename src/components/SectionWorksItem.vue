<script setup lang="ts">
import { ref, computed } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { animate } from 'popmotion'

const animationProgress = ref(0);
const animationTranslateParagraph = computed(() => `${animationProgress.value * 10 - 10}rem`)
const animationTranslateTitle = computed(() => `${animationProgress.value * 5 - 5}rem`)

let animation: { stop: () => void };

function onIntersectionObserver ([{ isIntersecting }] : Array<{ isIntersecting: boolean }>) {
  animation?.stop();
  animation = animate({
    from: animationProgress.value,
    to: isIntersecting ? 1 : 0,
    type: 'spring',
    stiffness: 100,
    onUpdate: latest => animationProgress.value = latest
})
}

defineProps({
  title: { 
    type: String,
    required: true
  },
  years: { 
    type: String,
    required: true
  },
  description: { 
    type: String,
    required: true
  },
  company: { 
    type: Object,
    required: true
  }
})
</script>

<template>
  <article 
    v-intersection-observer="[onIntersectionObserver, { threshold: 0.5 }]"
    class="article-works"
  >
    <div>
      <h2>{{ title }}</h2>     
      <h3>
        {{ years }} at 
        <a
          target="_blank"
          :href="company.link" 
          :style="{ color: company.color }"
        >
          {{ company.name }}
        </a>
      </h3>
    </div>
    <p>{{ description }}</p>
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
</style>