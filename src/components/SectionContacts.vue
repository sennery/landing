<script setup lang="ts">
import IconLink from './IconLink.vue'
import { computed } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { useIntersectAnimation } from '@/composables/intersectAnimation'
import { animateIntersectContacts } from '@/composables/three'

const { animationProgress, onIntersect } = useIntersectAnimation()

const animationTranslateParagraph = computed(() => `${10 - animationProgress.value * 10}rem`)
const animationTranslateTitle = computed(() => `${5 - animationProgress.value * 5}rem`)

const contacts = [
  {
    name: 'me@sennery.dev',
    link: 'mailto:me@sennery.dev',
  },
  {
    name: 'github',
    link: 'https://github.com/sennery',
  },
  {
    name: 'telegram',
    link: 'https://t.me/sennery',
  },
]

function onIntersection ([{ isIntersecting }]: Array<{ isIntersecting: boolean }>) {  
  onIntersect([{ isIntersecting }])
  
  if (isIntersecting) {
    animateIntersectContacts()
  }
}
</script>

<template>
  <section 
    v-intersection-observer="[onIntersection, { threshold: 1 }]"
    class="section-contacts"
  >
    <h2>contact me</h2>
    <ul class="contacts-list">
      <li
        v-for="contact in contacts"
        :key="contact.name"
      >
        <a 
          :href="contact.link"
          target="_blank"
          class="link"
        >
          {{ contact.name }}
          <IconLink class="icon" />
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.contacts-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.section-contacts {
  margin: 20rem 0;
}

.section-contacts > * {
  opacity: v-bind(animationProgress);
  transform: translateY(v-bind(animationTranslateParagraph));
  max-width: 40rem;
}

.section-contacts > h2 {
  transform: translateY(v-bind(animationTranslateTitle));
  margin: 2rem 0;
}

.icon {
  transform-origin: 50% 50%;
  transition: transform 0.6s cubic-bezier(0, 1, 0.18, 1); 
}

.link:hover .icon, .link:focus .icon {
  transform: rotateZ(45deg) translate(1rem, -1rem);
}
</style>