<script setup lang="ts">
import IconLink from '@/components/IconLink.vue'
import IconMail from '@/components//IconMail.vue'
import { computed } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { useIntersectionAnimation } from '@/composables/useIntersectAnimation'
import { animateBackgroundIntersectionContacts } from '@/three/animations'

const contacts = [
  {
    name: 'me@sennery.dev',
    link: 'mailto:me@sennery.dev',
    isMail: true,
  },
  {
    name: 'github',
    link: 'https://github.com/sennery',
  },
  {
    name: 'telegram',
    link: 'https://t.me/sennery',
  },
  {
    name: 'linkedin',
    link: 'https://www.linkedin.com/in/sennery/',
  },
]

const { animationProgress, animateIntersection } = useIntersectionAnimation()

const animationTranslateParagraph = computed(() => `${10 - animationProgress.value * 10}rem`)
const animationTranslateTitle = computed(() => `${5 - animationProgress.value * 5}rem`)

function onIntersection (entries: IntersectionObserverEntry[]) {
  animateIntersection(entries)

  const [{ isIntersecting }] = entries
  if (isIntersecting) {
    animateBackgroundIntersectionContacts()
  }
}
</script>

<template>
  <section
    v-intersection-observer="[onIntersection, { threshold: 0.5 }]"
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
          <IconMail
            v-if="contact.isMail"
            class="icon mail"
          />
          <IconLink
            v-else
            class="icon"
          />
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.section-contacts {
  /*margin: 20rem 0;*/
  height: 100vh;
}

.section-contacts > .contacts-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
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

.link:hover {
  color: var(--color-text-highlight);
}

.link:hover .icon, .link:focus .icon {
  transform: rotateZ(45deg) translate(1rem, -1rem);
}

.link:hover .icon.mail, .link:focus .icon.mail {
  transform: rotateZ(15deg) translate(1rem, 0rem);
}

@media (max-width: 800px) {
  .section-contacts > * {
    transform: translateY(calc(v-bind(animationTranslateParagraph) * var(--animation-values-coef)));
  }

  .section-contacts > h2 {
    transform: translateY(calc(v-bind(animationTranslateTitle) * var(--animation-values-coef)));
  }
}
</style>
