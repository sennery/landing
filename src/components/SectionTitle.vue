<script setup lang="ts">
import IconLess from '@/components/IconLess.vue'
import { ref } from 'vue'
import { animate } from 'popmotion'
import { vIntersectionObserver } from '@vueuse/components'
import { animateBackgroundIntersectionTitle } from '@/three/animations'

const isName = ref(false)

const NAME = [
  { letter: 'A', id: 7 },
  { letter: 'r', id: 8 },
  { letter: 's', id: 0 },
  { letter: 'e', id: 1 },
  { letter: 'n', id: 2 },
  { letter: 'i', id: 9 },
  { letter: 'i', id: 10 },
  { letter: 'L', id: 999 },
  { letter: 'i', id: 11 },
  { letter: 'k', id: 12 },
  { letter: 'h', id: 13 },
  { letter: 'a', id: 14 },
  { letter: 'c', id: 15 },
  { letter: 'h', id: 16 },
  { letter: 'e', id: 17 },
  { letter: 'v', id: 18 },
]

const NICKNAME = [
  { letter: 's', id: 0 },
  { letter: 'e', id: 1 },
  { letter: 'n', id: 2 },
  { letter: 'n', id: 3 },
  { letter: 'e', id: 4 },
  { letter: 'r', id: 5 },
  { letter: 'y', id: 6 },
]

const name = ref(NICKNAME)

function switchName (isIntersecting: boolean) {
  isName.value = isIntersecting
  name.value = isName.value ? NAME : NICKNAME
}

function onIntersection ([{ isIntersecting }]: IntersectionObserverEntry[]) {
  switchName(isIntersecting)

  if (isIntersecting) {
    animateBackgroundIntersectionTitle()
  }
}

function onBeforeEnter (el: Element) {
  const elem = el as HTMLElement
  elem.style.transform = 'translateY(1em) translateX(0.5em) rotateX(90deg)'
}

function onEnter (el: Element, done: () => void) {
  const elem = el as HTMLElement
  animate({
    from: 0,
    to: 100,
    type: 'spring',
    stiffness: 180,
    damping: 20,
    elapsed: -15 * +(elem.dataset.index ?? 0),
    onUpdate: latest => elem.style.transform = `translateY(${-latest / 100 * 1 + 1}em) translateX(${-latest / 100 * 0.5 + 0.5}em) rotateX(${-latest / 100 * 90 + 90}deg)`,
    onComplete: done,
  })
}

function onLeave (el: Element, done: () => void) {
  const elem = el as HTMLElement
  elem.style.opacity = '0'
  done()
}
</script>

<template>
  <section
    v-intersection-observer="[onIntersection, { threshold: 0.8 }]"
    class="section-title"
  >
    <div class="title">
      <TransitionGroup
        name="name"
        tag="h1"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <span
          v-for="(letter, index) in name"
          :key="letter.id"
          :data-index="index"
          :class="{
            'surname-start': letter.id === 999,
            'sennery': ![0, 1, 2].includes(letter.id) && !isName,
          }"
        >
          {{ letter.letter }}
        </span>
      </TransitionGroup>
      <span
        class="spec"
        :class="{ active: isName }"
      >
        web developer
      </span>

      <div
        v-if="isName"
        class="hint"
      >
        <IconLess />
        <span class="scroll-text">scroll down</span>
        <span class="swipe-text">swipe up</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-title {
  height: 100vh;
}

.section-title > .title > h1 {
  display: flex;
}

.section-title > .title > h1 > span {
  transform-origin: 0 0;
}

.surname-start {
  padding-left: 1.5rem;
}
.sennery {
  color: var(--color-text-highlight);
}

.name-move, .spec.active {
  transition: all 0.6s cubic-bezier(0, 1, 0.18, 1);
}

.spec {
  display: inline-block;
  font-size: 2rem;
  font-weight: 300;
  color: var(--color-text-secondary);
  opacity: 0;
  transform: translateX(2em);
}

.spec.active {
  opacity: 1;
  transform: translateX(0);
}

.hint {
  display: flex;
  position: fixed;
  align-items: center;
  gap: 0.5rem;
  bottom: 2rem;
  color: var(--color-text-secondary);
  animation: hintFade infinite 3s cubic-bezier(0, 1, 0.18, 1);

  --hint-fade-y-offset: -1rem;
  --hint-text-y-offset: -0.5rem;
}

.hint > .swipe-text {
  display: none;
}

.hint > span {
  animation: hintText infinite 3s;
}

.hint > svg {
  transform: scale(0.5);
}

@keyframes hintFade {
  0%, 100% {
    opacity: 0;
    transform: translateY(var(--hint-fade-y-offset));
  }

  40% {
    opacity: 1;
  }

  80% {
    opacity: 0;
    transform: translateY(0rem);
  }
}

@keyframes hintText {
  0%, 100% {
    transform: translateY(var(--hint-text-y-offset));
  }

  80% {
    transform: translateY(0rem);
  }
}

@media (max-width: 800px) {
  .surname-start {
    padding-left: 0.5rem;
  }

  .hint {
    --hint-fade-y-offset: 1rem;
    --hint-text-y-offset: 0.5rem;
  }

  .hint > .swipe-text {
    display: initial;
  }

  .hint > .scroll-text {
    display: none;
  }

  .hint > svg {
    transform: scale(0.5) rotateZ(180deg);
  }
}
</style>
