<script setup lang="ts">
import { ref, computed } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { animate } from 'popmotion'

const animationProgress = ref(0);
const animationTranslate = computed(() => `${10 - animationProgress.value * 10}rem`)

let animation: { stop: () => void };

function onIntersectionObserver ([{ isIntersecting }] : Array<{ isIntersecting: boolean }>) {
  animation?.stop();
  animation = animate({
    from: animationProgress.value,
    to: isIntersecting ? 1 : 0,
    type: 'spring',
    onUpdate: latest => animationProgress.value = latest
})
}
</script>

<template>
  <section 
    v-intersection-observer="[onIntersectionObserver, { threshold: 1 }]"
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
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-about > * {
  transform-origin: 50% 50%;
  opacity: v-bind(animationProgress);
  transform: translateY(v-bind(animationTranslate));
  max-width: 40rem;
}

.section-about > h2 {
    margin: 2rem 0;
}
</style>