<script setup lang="ts">
import { computed } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { useIntersectAnimation } from '@/composables/intersectAnimation';

const { animationProgress, onIntersect } = useIntersectAnimation();

const animationTranslateParagraph = computed(() => `${10 - animationProgress.value * 10}rem`)
const animationTranslateTitle = computed(() => `${5 - animationProgress.value * 5}rem`)
</script>

<template>
  <section 
    v-intersection-observer="[onIntersect, { threshold: 1 }]"
    class="section-about"
  >
    <h2>about me</h2>     
    <p>
      Hi, my name is Arsenii Likhachev. <br> 
      I'm a 23 y.o. web developer making complex and clean web applications. <br>
      Love learning and developing. 
    </p>
  </section>
</template>

<style scoped>
.section-about {
  margin: 20rem 0;
}

.section-about > * {
  opacity: v-bind(animationProgress);
  transform: translateY(v-bind(animationTranslateParagraph));
  max-width: 40rem;
}

.section-about > h2 {
  transform: translateY(v-bind(animationTranslateTitle));
  margin: 2rem 0;
}
</style>