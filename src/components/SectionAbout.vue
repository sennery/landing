<script setup lang="ts">
import { computed, ref } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { useIntersectionAnimation } from '@/composables/intersectAnimation'
import { useTimePassed } from '@/composables/getTimePassed'
import { animateBackgroundIntersectionAbout } from '@/composables/three'

const { years: age } = useTimePassed('1999-03-18T05:00:00+0500')
const { years, weeks, days, hours, minutes, seconds, sumSeconds } = useTimePassed('2020-06-16T05:00:00+0500')

const onlySeconds = ref(true)
const changeExpTime = () => onlySeconds.value = !onlySeconds.value

const englishPluralRules = new Intl.PluralRules('en')

const { animationProgress, animateIntersection } = useIntersectionAnimation()

const animationTranslateParagraph = computed(() => `${10 - animationProgress.value * 10}rem`)
const animationTranslateTitle = computed(() => `${5 - animationProgress.value * 5}rem`)

function onIntersection (entries: IntersectionObserverEntry[]) {
  animateIntersection(entries)

  const [{ isIntersecting }] = entries
  if (isIntersecting) {
    animateBackgroundIntersectionAbout()
  }
}
</script>

<template>
  <section
    v-intersection-observer="[onIntersection, { threshold: 0.5 }]"
    class="section-about"
  >
    <h2>about me</h2>
    <p>
      Hello, my name is Arsenii Likhachev.
      I am a <span>{{ age }}</span> y.o. web developer. I create complex and clean web applications for
      <span
        v-if="onlySeconds"
        class="exp-time"
        @click="changeExpTime"
      >
        {{ sumSeconds }} sec.
      </span>
      <span
        v-else
        class="exp-time"
        @click="changeExpTime"
      >
        <span>{{ `${years} ${englishPluralRules.select(years) === 'one' ? 'year' : 'years'} ` }}</span>
        <span>{{ `${weeks} ${englishPluralRules.select(weeks) === 'one' ? 'week' : 'weeks'} ` }}</span>
        <span>{{ `${days} ${englishPluralRules.select(days) === 'one' ? 'day' : 'days'} ` }}</span>
        <span>{{ `${hours} ${englishPluralRules.select(hours) === 'one' ? 'hour' : 'hours'} ` }}</span>
        <span>{{ `${minutes} ${englishPluralRules.select(minutes) === 'one' ? 'minute' : 'minutes'} ` }}</span>
        <span>{{ `${seconds} ${englishPluralRules.select(seconds) === 'one' ? 'second' : 'seconds'}.` }}</span>
      </span>
      Love learning and development.
    </p>
  </section>
</template>

<style scoped>
.section-about {
  margin-bottom: 20rem;
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

.exp-time {
  cursor: pointer;
  color: var(--color-text-highlight);
}

@media (max-width: 800px) {
  .section-about {
    margin-bottom: 10rem;
  }

  .section-about > * {
    transform: translateY(calc(v-bind(animationTranslateParagraph) * var(--animation-values-coef)));
  }

  .section-about > h2 {
    transform: translateY(calc(v-bind(animationTranslateTitle) * var(--animation-values-coef)));
  }
}
</style>
