<script setup lang="ts">
import { computed } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { useIntersectAnimation } from '@/composables/intersectAnimation';

const { animationProgress, onIntersect } = useIntersectAnimation();

const animationTranslateParagraph = computed(() => `${10 - animationProgress.value * 10}rem`)
const animationTranslateTitle = computed(() => `${5 - animationProgress.value * 5}rem`)

const contacts = [
    {
        name: 'mac452ares@gmail.com',
        link: 'mailto:mac452res@gmail.com'
    },
    {
        name: 'github',
        link: 'https://github.com/sennery'
    },
    {
        name: 'telegram',
        link: 'https://t.me/sennery'
    },
]
</script>

<template>
  <section 
    v-intersection-observer="[onIntersect, { threshold: 1 }]"
    class="section-contacts"
  >
    <h2>contact me</h2>
    <ul class="contacts-list">
      <a 
        v-for="contact in contacts"
        :key="contact.name"
        :href="contact.link"
        target="_blank"
      >
        {{ contact.name }}
      </a>
    </ul>
  </section>
</template>

<style scoped>
.section-contacts, .contacts-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-contacts {
    margin: 20rem 0;
}

.section-contacts > * {
  transform-origin: 50% 50%;
  opacity: v-bind(animationProgress);
  transform: translateY(v-bind(animationTranslateParagraph));
  max-width: 40rem;
}

.section-contacts > h2 {
  transform: translateY(v-bind(animationTranslateTitle));
  margin: 2rem 0;
}

.contacts-list {
    gap: 0.5rem;
}
</style>